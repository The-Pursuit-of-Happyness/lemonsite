'use strict';

const DaoService = require('./daoService');

class CommentService extends DaoService {
  init() {
    this.model = this.ctx.model.Comment;
  }

  async create(comment) {
    return await super.create(comment);
  }

  // 查询
  async index(query) {
    return await super.index(query);
  }
}
module.exports = CommentService;