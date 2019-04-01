'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
      // const param = this.ctx.params;// 获取路由上的参数
      // const newLink = await this.ctx.model.User.create({
      //     userName:'guofen'
      // });                          //添加到数据库
     // create find remove update
    this.ctx.body = {
      Data: {
        id: 'ls0001',
        name: 'guofen',
        level: 2,
        token: '832423742834238940280800123',
        telphone: '',
        age: 25,
      },
      ResultType: 0,
      Message: '请求成功',
    };
  }

  async home() {
    this.ctx.body = {
      Data: {
        version: '1.0.1',
        time: '2019-4-1',
      },
      ResultType: 0,
      Message: '请求成功',
    };
  }
}

module.exports = HomeController;
