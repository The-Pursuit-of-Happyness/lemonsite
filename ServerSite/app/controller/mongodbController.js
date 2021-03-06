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
      this.success({
        status: 200,
        data: detail,
        message: '数据获取成功'
      })
    } else {
      this.fail({
        status: 400,
        data: detail,
        message: '数据获取失败'
      })
    }
  }

  // 计算数量
  async count(query) {
    return await this.daoService.count(query);
  }

  // 修改/更新数据
  async update(ctx) {
    let result = await this.daoService.update(ctx.request.body.id, ctx.request.body);
    if (result._id) {
      this.success({
        status: 200,
        data: result,
        message: '更新数据成功'
      })
    } else {
      this.fail({
        status: 400,
        data: '',
        message: '数据更新失败'
      })
    }
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
    this.ctx.body = {...result };
  }

  // 请求失败
  fail(message = undefined, status = 200) {
    this.ctx.status = status;
    this.ctx.body = {
      success: false,
      ...message
    };
  }
};

module.exports = MongodbController;