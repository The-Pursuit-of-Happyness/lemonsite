'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // ctx.body = 'hi, egg';
    // const id = ctx.request.query;
    // ctx.response.body = 'hi, egg';
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
