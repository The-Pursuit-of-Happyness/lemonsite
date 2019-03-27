const Mock = require('mockjs');
const express = require("express");
const router = express.Router();
const handleData = require('./userDB');

router.use("/login", function(req, res) {
  console.log('body:',req.body);
  const param = {
    telephone:'123456'
  }
  // 加入到数据库里面
  // handleData((collection) =>{
  //   collection.insert(param)
  // });
  //调用mock方法模拟数据
  var data = Mock.mock({
    'Data': {
      id: 'ls0001',
      name: '张三',
      level: 2,
      token: '832423742834238940280800123',
      telphone: '',
      age: 24
    },
    "ResultType": 0,
    "Message": '请求成功'
  });
  return res.json(data);
})
module.exports = router;