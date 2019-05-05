'use strict';

const DaoService = require('./daoService');

class BookService extends DaoService {
  init() {
    this.model = this.ctx.model.Book;
  }

  async create(book) {
    super.create(book);
    const data = {
      status: 200,
      data: "保存成功"
    }
    return data;
  }

  async show(name) {
    const queries = {
      name
    };

    const detail = await this.model.findOne(queries);
    const data = {
      status: 200,
      data: detail
    }
    return data;
  }
}

module.exports = BookService;