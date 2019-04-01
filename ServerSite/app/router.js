'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/about', controller.home.home);
  router.post('/api/user/login', controller.home.index);
};
