'use strict'

// 存储收藏信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const collectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    collecterId: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
    colecteTime: {
      type: String,
      required: true,
    },
  }, {
    versionKey: false,
  });
  return mongoose.model('collect', collectSchema);
}