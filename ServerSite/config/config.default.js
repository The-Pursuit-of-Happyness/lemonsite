/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.cors = {
    // origin: 'http://localhost:3000',
    // credentials: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553838688651_7142';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/admin',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
