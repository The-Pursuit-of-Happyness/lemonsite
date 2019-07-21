import * as restService from "../servers/api"

const model = {
    namespace: 'article',
    state: {
        articleList: [],
        tagList: [],
    },
    effects: {
        * addArticle({ payload }, { call, put }) {
            const response = yield call(restService.addArticle, payload);
            yield put({ type: 'result', payload: response });
        },
        * deleteArticle({ payload }, { call, put }) {
            const response = yield call(restService.deleteArticle, payload);
            yield put({ type: 'result', payload: response });
        },
        * getArticleList({ payload }, { call, put }) {
            const response = yield call(restService.getArticleList, payload);
            yield put({ type: 'articlelist', payload: response.Data });
        },

        * getTagList({}, { call, put }) {
            const response = yield call(restService.getTagList);
            yield put({ type: 'getTag', payload: response.Data });
        },
        * importExcel({ payload }, { call, put }) {
            const response = yield call(restService.importExcel, payload);
            yield put({ type: 'importfile', payload: response.Data });
        }
    },
    reducers: {
        result(state, action) {
            // return {
            //   ...state,
            //   articleinfo: action.payload.articleinfo
            // }
            return {
                ...state
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
        importfile(state, action) {
            return {
                ...state
            }
        }
    }
}

export default model;