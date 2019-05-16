import * as restService from "../servers/api"

const model = {
  namespace: 'article',
  state: {
    articleinfo: {},
    articleList: [],
    tagList: [],
  },
  effects: {
    * addArticle({ payload }, { call, put }) {
      const response = yield call(restService.addArticle, payload);
      yield put({ type: 'addresult', payload: response.Data });
    },
    * getArticleList({ payload }, { call, put }) {
      const response = yield call(restService.getArticleList, payload);
      yield put({ type: 'articlelist', payload: response.Data });
    },

    * getTagList({}, { call, put }) {
      const response = yield call(restService.getTagList);
      yield put({ type: 'getTag', payload: response.Data });
    }
  },
  reducers: {
    addresult(state, action) {
      return {
        ...state,
        articleinfo: action.payload.articleinfo
      }
    },
    articlelist(state, action) {
      return {
        ...state,
        articleList: action.payload.articleList
      }
    },

    getTag(state, action) {
      console.log('action:', action);
      return {
        ...state,
        tagList: action.payload.tagList
      }
    },
  }
}

export default model;