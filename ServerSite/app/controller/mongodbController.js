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
    // ctx.body = await this.daoService.show(ctx.params.id);
    const detail = await this.daoService.show(ctx.params.id);
    if (detail) {
      ctx.body = {
        status: 200,
        data: detail,
        message: '数据获取成功'
      };
    } else {
      ctx.body = {
        status: 400,
        data: detail,
        message: '数据获取失败'
      };
    }
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
  async destory(ctx) {
    let result = await this.daoService.destory(ctx.params.id);
    if (result.deletedCount) {
      ctx.body = {
        status: 204,
        data: '',
        message: '删除成功',
      }
    } else {
      ctx.body = {
        status: 400,
        data: '',
        message: '删除失败，请稍后重试',
      }
    }
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