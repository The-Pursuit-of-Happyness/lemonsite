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
