'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/about', controller.home.about);
  router.post('/api/user/login', controller.home.login);
  router.post('/api/article/articleList',controller.article.getList);
  router.get('/api/article/:id',controller.article.getDetail);
  router.get('/api/tags',controller.tag.getTagList);
};
