'use strict';

const DaoService = require('./daoService');

class CollectService extends DaoService {
  init() {
    this.model = this.ctx.model.Collect;
  }

  async create(collect) {
    const id = super.create(collect);
    let data = {};
    if (id) {
      data = {
        status: 200,
        data: '',
        message: '添加收藏成功',
      }
    } else {
      data = {
        status: 400,
        data: '',
        message: '添加收藏失败,请稍后重试',
      }
    }
    return data;
  }

  // 计算数量
  async count(query) {
    return await super.count(query);
  }

  // 查询
  async index(query) {
    return await super.index(query);
  }
}
module.exports = CollectService;