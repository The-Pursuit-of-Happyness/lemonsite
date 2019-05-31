'use strict'

const mongoose = require('mongoose');
const moment = require('moment');
const Service = require('egg').Service;

class DaoService extends Service {
  constructor(ctx) {
    super(ctx);
    this.defaultSort = { _id: -1 };
    this.init && this.init();
  }

  // 请求成功
  success(result) {
    return {
      success: true,
      result,
    }
  }

  // 请求失败
  false(message) {
    return {
      success: false,
      message,
    }
  }

  // 分页查找
  async index(query, selectFileds) {
    return await this.findByPage(this.queryCriteria(query), query, selectFileds, this.sort(query));
  }

  // 根据id 查找
  async show(_id, selectFileds) {
    return await this.model.findOne({ _id }, selectFileds);
  }

  // 修改更新数据
  async update(_id, params) {
    params.update = moment().valueOf();
    const result = await this.model.findOneAndUpdate({ _id }, { $set: params }, { new: true });
    return { _id: result._id };
  }

  // 创建数据
  async create(request) {
    if (!request) { return; }
    request._id = mongoose.Types.ObjectId();
    request.created = moment().valueOf();
    const result = await this.model.create(request);
    return { _id: result._id };
  }

  // 删除数据
  async destory(_id) {
    return await this.model.remove({ _id });
  }

  // 计算数量
  async count(query) {
    return await this.model.countDocuments(query);
  }

  // 条件查找
  async find(query, sort = this.defaultSort, selectFileds) {
    return await this.model.find(query)
      .select(selectFileds)
      .sort(sort);
  }

  // 查找某一个数据
  async findOne(query) {
    return await this.model.findOne(query);
  }

  // 分页查找
  async findByPage(params, pagin = {}, selectFileds, sort = this.defaultSort) {
    const count = await this.count(params);
    const page = Number(pagin.page || 1);
    const pageSize = Number(pagin.pageSize || 10);
    const from = (page - 1) * pageSize;

    const items = await this.model.find(params)
      .skip(from)
      .limit(pageSize)
      .select(selectFileds)
      .sort(sort);

    const result = {
      count,
      page,
      pageSize,
      items,
    };
    return result;
  }

  // 条件查找
  queryCriteria(search) {
    const queries = {};
    // 相等
    if (search.eqs) {
      Object.assign(queries, search.eqs);
    }
    // 相似
    if (search.likes) {
      for (const [key, value] of Object.entries(search.likes)) {
        queries[key] = { $regex: value };
      }
    }

    // 包含
    if (search.ins) {
      for (const [key, value] of Object.entries(search.ins)) {
        queries[key] = { $in: value };
      }
    }

    // 特定次数
    if (search.times) {
      for (const [key, value] of Object.entries(search.times)) {
        const start = value.start;
        const end = value.end;
        if (!queries[key] && (start || end)) {
          queries[key] = {};
        }

        if (start) {
          queries[key].$gte = start;
        }

        if (end) {
          queries[key].$lte = end;
        }
      }
    }
    return queries;
  }

  // 排序
  sort(search) {
    let queries;
    if (search.sorts) {
      for (const [key, value] of Object.entries(search.sorts)) {
        if (!queries) {
          queries = {};
        }
        let sortValue = -1;
        switch (value) {
          case 'asc':
            sortValue = 1;
            break;
          case 'desc':
            sortValue = -1;
            break;
        }
        queries[key] = sortValue;
      }
    }
    return queries;
  }

  // 通过id查找一条数据并且更新
  async findOneAndUpdateById(_id, updateFileds) {
    const result = await this.model.findOneAndUpdate({ _id }, updateFileds, { new: true });
    return result ? this.success : this.fail();
  }

  // 通过条件查找一条数据并且更新
  async findOneAndUpdate(query, updateFileds) {
    const result = await this.model.findOneAndUpdate(query, updateFileds, { new: true });
    return result ? this.success() : this.fail();
  }

  // 更新多条数据
  async updateMulti(query, updateFileds) {
    const result = await this.model.update(query, updateFileds, { multi: true });
    return result;
  }

  // 移除满足条件的数据
  async remove(query) {
    return await this.model.remove(query);
  }
}

module.exports = DaoService;