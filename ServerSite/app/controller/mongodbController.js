'use strict'
/**
 *  mongodb 数据操作控制器
 */

const Controller = require('egg').Controller;

class MongodbController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.init && this.init();
  }

  // 根据条件查询
  async index(ctx) {
    ctx.body = await this.daoService.index(ctx.query);
  }

  // 根据id查找某个数据
  async show(ctx) {
    ctx.body = await this.daoService.index(ctx.params.id);
  }

  // 修改/更新数据
  async update(ctx) {
    ctx.body = await this.daoService.update(ctx.params.id, ctx.request.body);
  }

  // 新增数据
  async create(ctx) {
    ctx.body = await this.daoService.create(ctx.request.body);
  }

  // 删除数据
  async destorey(ctx) {
    ctx.body = await this.daoService.destorey(ctx.params.id);
  }

  // 请求成功
  success(result) {
    this.ctx.body = {
      success: true,
      result,
    }
  }

  // 请求失败
  fail(message = undefined, status = 200) {
    this.ctx.status = status;
    this.ctx.body = {
      success: false,
      message
    };
  }
};

module.exports = MongodbController;