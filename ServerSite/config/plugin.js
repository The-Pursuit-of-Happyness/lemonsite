'use strict';

const DEBUG = Boolean(process.env.DEBUG);
exports.cors = {
  enabled: true,
  package: 'egg-cors',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.swagger2 = {
  enable: true,
  package: 'egg-swagger2',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};