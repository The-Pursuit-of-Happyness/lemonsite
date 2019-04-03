'use strict';
const md5 = require('md5');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
      // const param = this.ctx.params;// 获取路由上的参数
      const { name, password } = this.ctx.request.body;
      const newLink = await this.ctx.model.User.create({
          userName:name,
          password,
      });                          //添加到数据库


     // create find remove update
    this.ctx.body = {
      Data: {
        id: 'ls0001',
        name: name,
        level: 2,
        token: '832423742834238940280800123',
        telphone: '',
        age: 25,
      },
      ResultType: 0,
      Message: '请求成功',
    };
  }

  async about() {

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
