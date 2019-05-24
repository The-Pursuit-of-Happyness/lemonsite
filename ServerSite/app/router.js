'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, swagger } = app;
  router.get('/api/user/about', controller.home.about);
  router.post('/api/user/login', controller.home.login);
  swagger.post('/api/user/login', {
    tags: ['用户'],
    summary: 'Login a admin',
    description: '用户登录',
    parameters: [{ in: 'body',
      name: 'body',
      description: 'admin\'s username & password',
      required: true,
      schema: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            type: 'string',
            description: 'admin\'s username',
          },
          password: {
            type: 'string',
            description: 'admin\'s password',
          },
        },
      },
    }, ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'status',
            },
            data: {
              type: 'object',
              description: 'data',
              properties: {
                token: {
                  type: 'string',
                  description: 'token',
                },
              },
            },
          },
        },
      },
    },
  });
  router.post('/api/article/addarticle', controller.article.addArticle);
  router.get('/api/article/deletearticle', controller.article.deleteArticle);
  router.get('/api/article/searcharticle', controller.article.searchArticle);
  router.post('/api/article/articleList', controller.article.getList);
  router.get('/api/article/:id', controller.article.getDetail);
  router.get('/api/tags', controller.tag.getTagList);
};