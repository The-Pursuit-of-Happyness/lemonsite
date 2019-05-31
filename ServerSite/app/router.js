'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, swagger } = app;
  router.get('/api/user/about', controller.home.about);
  router.get('/api/article/searcharticle', controller.article.searchArticle);
  router.get('/api/tags', controller.tag.getTagList);



  // 用户登录
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

  // 新增文章
  router.post('/api/article/addarticle', controller.article.addArticle);
  swagger.post('/api/article/addarticle', {
    tags: ['文章'],
    summary: '新增文章',
    description: '新增文章',
    parameters: [{ in: 'body',
      name: 'body',
      description: '新增文章',
      required: true,
      schema: {
        type: 'object',
        required: ['id'],
        properties: {
          articleContent: {
            type: 'string',
            description: '文章内容',
          },
          articleName: {
            type: 'string',
            description: '文章标题'
          },
          articleType: {
            type: 'int32',
            description: '文章类别',
          },
          artiidId: {
            type: 'string',
            description: '文章id'
          },
          authorId: {
            type: 'string',
            description: '作者id'
          },
          comment: {
            type: 'int32',
            description: '评论数'
          },
          commentCount: {
            type: 'int32',
            description: '评论数'
          },
          createtime: {
            type: 'date',
            description: '创建时间'
          },
          imageUrl: {
            type: 'string',
            description: '图片url'
          },
          lastModification: {
            type: 'string',
            description: '作者id'
          },
          likeNum: {
            type: 'int32',
            description: '喜欢数量'
          },
          linkicon: {
            type: 'string',
            description: '链接url'
          },
          pageView: {
            type: 'int32',
            description: '浏览量'
          },
          source: {
            type: 'string',
            description: '文章来源'
          },
          tag: {
            type: 'string',
            description: '标签'
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
              properties: {},
            },
          },
        },
      },
    },
  });

  // 根据id删除文章
  router.delete('/api/article/:id', controller.article.deleteArticle);
  swagger.delete('/api/article/{id}', {
    tags: ['文章'],
    summary: '根据id删除文章',
    description: '删除文章',
    parameters: [{ in: 'path',
      name: 'id',
      description: '删除文章',
      required: true,
      schema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            description: '文章id',
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
              properties: {},
            },
          },
        },
      },
    },
  });

  // 更新/修改文章
  router.post('/api/article/updateArticle', controller.article.updateArticle);
  swagger.post('/api/article/updateArticle', {
    tags: ['文章'],
    summary: '根据id更新/修改文章内容',
    description: '修改/更新文章',
    parameters: [{ in: 'body',
      name: 'body',
      description: 'id',
      required: true,
      schema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            description: '文章id',
          },
          articleContent: {
            type: 'string',
            description: '文章内容',
          },
          articleName: {
            type: 'string',
            description: '文章标题'
          },
          articleType: {
            type: 'int32',
            description: '文章类别',
          },
          artiidId: {
            type: 'string',
            description: '文章id'
          },
          authorId: {
            type: 'string',
            description: '作者id'
          },
          comment: {
            type: 'int32',
            description: '评论数'
          },
          commentCount: {
            type: 'int32',
            description: '评论数'
          },
          createtime: {
            type: 'date',
            description: '创建时间'
          },
          imageUrl: {
            type: 'string',
            description: '图片url'
          },
          lastModification: {
            type: 'string',
            description: '作者id'
          },
          likeNum: {
            type: 'int32',
            description: '喜欢数量'
          },
          linkicon: {
            type: 'string',
            description: '链接url'
          },
          pageView: {
            type: 'int32',
            description: '浏览量'
          },
          source: {
            type: 'string',
            description: '文章来源'
          },
          tag: {
            type: 'string',
            description: '标签'
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
            id: {
              type: 'string',
              description: 'article id',
            },
            status: {
              type: 'string',
              description: 'status',
            },
            data: {
              type: 'object',
              description: 'data',
              properties: {
                id: {
                  type: 'string',
                  description: '文章id'
                },
              },
            },
          },
        },
      },
    },
  });

  // 根据id查询文章
  router.get('/api/article/:id', controller.article.getArticleDetial);
  swagger.get('/api/article/{id}', {
    tags: ['文章'],
    summary: '根据id获取文章详情',
    description: '文章详情',
    parameters: [{ in: 'body',
      name: 'body',
      description: 'admin\'s username & password',
      required: true,
      schema: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            description: 'article id',
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
                id: {
                  type: 'string',
                  description: '文章id'
                },
                authorId: {
                  type: 'string',
                  description: '作者id'
                },
                tag: {
                  type: 'string',
                  description: '文章标签',
                },
                articleName: {
                  type: 'string',
                  description: '文章标题'
                },
                articleContent: {
                  type: 'string',
                  description: '文章内容',
                },
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

  // 根据条件搜索文章列表
  router.post('/api/article/articleList', controller.article.getArticleList);
  swagger.post('/api/article/articleList', {
    tags: ['文章'],
    summary: '文章列表',
    description: '根据条件查询文章列表',
    parameters: [{ in: 'body',
      name: 'body',
      description: '支持分页获取全部文章列表，根据文章名称模糊搜索，根据文章内容搜索',
      required: true,
      schema: {
        type: 'object',
        required: ['pageIndex', 'pageSize', 'type', 'value'],
        properties: {
          pageIndex: {
            type: 'int32',
            description: '当前查看的分页数',
          },
          pageSize: {
            type: 'int32',
            description: '分页大小',
          },
          type: {
            type: 'string',
            description: '查询类型  all 全部文章列表 title  根据标题模糊搜索 content 文章内容搜索'
          },
          value: {
            type: 'string',
            description: '查询的数据'
          }
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
                articleContent: {
                  type: 'string',
                  description: '文章内容',
                },
                articleName: {
                  type: 'string',
                  description: '文章标题'
                },
                articleType: {
                  type: 'int32',
                  description: '文章类别',
                },
                artiidId: {
                  type: 'string',
                  description: '文章id'
                },
                authorId: {
                  type: 'string',
                  description: '作者id'
                },
                comment: {
                  type: 'int32',
                  description: '评论数'
                },
                commentCount: {
                  type: 'int32',
                  description: '评论数'
                },
                createtime: {
                  type: 'date',
                  description: '创建时间'
                },
                imageUrl: {
                  type: 'string',
                  description: '图片url'
                },
                lastModification: {
                  type: 'string',
                  description: '作者id'
                },
                likeNum: {
                  type: 'int32',
                  description: '喜欢数量'
                },
                linkicon: {
                  type: 'string',
                  description: '链接url'
                },
                pageView: {
                  type: 'int32',
                  description: '浏览量'
                },
                source: {
                  type: 'string',
                  description: '文章来源'
                },
                tag: {
                  type: 'string',
                  description: '标签'
                },
              },
            },
          },
        },
      },
    },
  });
};