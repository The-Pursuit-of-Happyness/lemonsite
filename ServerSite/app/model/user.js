'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
      type: String,
      required: true,
    },
    sex: {
      type: Number,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    likeNum: {
      type: Number,
      required: false,
    },
    articlePageView: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  });
  return mongoose.model('users', UserSchema);
};