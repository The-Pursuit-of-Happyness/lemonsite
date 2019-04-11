'use strict';
const Controller = require('egg').Controller;

class TagController extends Controller {
    async getTagList() {
        this.ctx.body = {
            Data: {
                tagList:['正则','css','js','h5','mongodb','react','vue','小程序','算法','node','生活']
            },
            ResultType: 0,
            Message: '请求成功',
        };
    }
}

module.exports = TagController;
