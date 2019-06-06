'use strict'

// 存储收藏信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner_user_id: {
      type: String,
      required: true,
    },
    target_user_id: String,
    likeCount: Number,
    articleId: {
      type: String,
      require: true,
    },
    parent_id: String,
    commentType: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, {
    versionKey: false,
  });
  return mongoose.model('comments', commentSchema);
}