'use strict'

// 存储收藏信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createrId: {
      type: String,
      required: true,
    },
    commentType: {
      type: String,
      required: true,
    },
    createTime: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, {
    versionKey: false,
  });
  return mongoose.model('comment', commentSchema);
}