const Mock = require('mockjs')
var express = require("express")
var router = express.Router();

router.use("/login", function(req, res) {
  console.log(req.body);
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
router.use("/about", function(req, res) {
  console.log(req.body);
  //调用mock方法模拟数据
  var data = Mock.mock({
    'Data': {
      version: '1.0.1',
      time: '2019-3-28'
    },
    "ResultType": 0,
    "Message": '请求成功'
  });
  return res.json(data);
})
module.exports = router;