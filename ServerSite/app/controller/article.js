'use strict'

const iconv = require('iconv-lite'); // 处理gbk文件中文乱码
//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
//egg.js Controller
const Controller = require('egg').Controller;
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
//当然你也可以不使用这个 哈哈 个人比较赖
//还有我们这里使用了egg-multipart
// const md5 = require('md5');

const xlsx = require('node-xlsx');

const MongodbController = require('./mongodbController');

class ArticleController extends MongodbController {
    init() {
        this.daoService = this.service.article;
    }

    //导入文件
    async importFile(ctx) {
        // ctx.body = {
        //     status: 400,
        //     data: '',
        //     message: '文章不存在',
        // }
        const stream = await ctx.getFileStream();

        //新建一个文件名
        // const filename = stream.filename;
        const filename = stream.filename.split('.')[0] + path
            .extname(stream.filename)
            .toLocaleLowerCase();
        //文件生成绝对路径
        //当然这里这样市不行的，因为你还要判断一下是否存在文件路径
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        // console.log(writeStream);


        const workbook = xlsx.parse(target);
        console.log(workbook);
        let sheetNames = workbook[0].name; //获取表明
        console.log(sheetNames);
        let sheet = workbook.Sheets[sheetNames]; //通过表明得到表对象
        console.log(sheet);
        var data = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
        console.log(data);

        try {
            //异步把文件流 写入
            let file = await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }

        // // 通过FileReader对象读取文件
        // const fileReader = new FileReader();
        // fileReader.onload = event => {
        //     try {
        //         const { result } = event.target;
        //         // 以二进制流方式读取得到整份excel表格对象
        //         const workbook = XLSX.read(result, { type: 'binary' });
        //         let data = []; // 存储获取到的数据
        //         // 遍历每张工作表进行读取（这里默认只读取第一张表）
        //         for (const sheet in workbook.Sheets) {
        //             if (workbook.Sheets.hasOwnProperty(sheet)) {
        //                 // 利用 sheet_to_json 方法将 excel 转成 json 数据
        //                 data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
        //                 // break; // 如果只取第一张表，就取消注释这行
        //             }
        //         }
        //         console.log(data);
        //     } catch (e) {
        //         // 这里可以抛出文件类型错误不正确的相关提示
        //         console.log('文件类型不正确');
        //         return;
        //     }
        // };
        // // 以二进制方式打开文件
        // fileReader.readAsBinaryString(target);
        //文件响应
        ctx.status = 200
        ctx.body = {
            url: '/public/uploads/' + filename
        };
    }

    // 添加文章
    async addArticle(ctx) {
        const article = ctx.request.body;
        // const count = await this.service.article.count({ title: article.title });
        // if (count > 0) {
        //   this.fail('文章已存在', 417);
        //   return;
        // }
        await super.create(ctx);
    }

    /**
     * 修改更新文章
     * @param {*} ctx
     * @memberof ArticleController
     */
    async updateArticle(ctx) {
        const count = await this.service.article.count({ _id: ctx.request.body.id });
        if (count) {
            await super.update(ctx);
        } else {
            super.fail({ status: 400, message: '文章不存在' });
        }
    }

    /**
     * 根据文章id查看详情
     * @param {id} ctx 
     */
    async getArticleDetial(ctx) {
        const count = await this.service.article.count({ _id: ctx.params.id });
        if (count) {
            await super.show(ctx);
        } else {
            ctx.body = {
                status: 400,
                data: '',
                message: '文章不存在',
            }
        }
    }

    /**
     * 删除文章
     * @param {id} ctx 
     */
    async deleteArticle(ctx) {
        const count = await this.service.article.count({ _id: ctx.params.id });
        if (count) {
            await super.destory(ctx);
        } else {
            ctx.body = {
                status: 400,
                data: '',
                message: '文章不存在',
            }
        }
    }

    async searchArticle(ctx) {
        const article = await this.service.article.show(ctx.query._id);
        ctx.body = article;
    }

    /**
     * 分页查询文章
     * @param {pageIndex,pageSize,type,value} ctx 
     */
    async getArticleList(ctx) {
        var rule = {
            pageIndex: 'int',
            pageSize: 'int',
            type: ["all", "title", "content"], // all 全部 ， title :标题 ,content:'文章内容'
            value: {
                type: 'string',
                required: false,
            }
        }
        let result = this.app.validator.validate(rule, ctx.request.body);
        if (result) {
            ctx.body = {
                data: [],
                status: 400,
                message: "参数错误:" + result.map(item =>
                    item.field + ": " + item.message
                )
            }
        } else {
            const { type } = ctx.request.body;
            let result;
            // 获取全部文章
            if (type == 'all') {
                result = await this.service.article.index(ctx.request.body);
            } else if (type == 'title') {
                // 根据标题查询
                result = await this.service.article.index({ likes: { articleName: ctx.request.body.value, }, ...ctx.request.body });
            } else if (type == 'content') {
                // 根据内容查询
                result = await this.service.article.index({ likes: { articleContent: ctx.request.body.value, }, ...ctx.request.body });
            }
            if (result.count >= 0) {
                super.success({
                    data: result,
                    status: 200,
                    message: '获取成功'
                })
            } else {
                super.fail({ status: 400, message: '获取失败' });
            }
        }
    }
}

module.exports = ArticleController;