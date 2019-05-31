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
    client: {
      url: 'mongodb://66.42.42.120/gxsite', //你的数据库地址，不要端口
      options: {
        useNewUrlParser: true,
      },
    }

    // url: 'mongodb://66.42.42.120:27017/admin',
    // url: 'mongodb://localhost:27017/admin',
  };

  // validate
  config.validate = {
    // convert:false,
    // validateRoot:false,
  };

  // swagger
  config.swagger2 = {
    enable: true,
    base: {
      schemes: [
        'http',
      ],
      // host: '127.0.0.1:7001',
      // basePath: '/',
      // consumes: [
      //   'application/json',
      // ],
      // produces: [
      //   'application/json',
      // ],
      info: {
        description: 'gx-site 网站接口',
        version: '1.0.0',
        title: 'gx-site接口API',
        contact: {
          email: '1025582613@qq.com'
        },
        license: {
          name: 'appache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      },
      tags: [{
        name: '文章',
        description: '技术文章相关操作接口',
      }, {
        name: '评论',
        description: '评论相关操作接口'
      }, {
        name: '用户',
        description: '用户相关操作接口'
      }],
      definitions: {},
      securityDefinitions: {}
    },
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