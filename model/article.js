import * as restService from "../servers/api"

const model = {
    namespace:'article',
    state: {
        articleList:[],
        tagList:[],
    },
    effects:{
        * getArticleList({ payload }, { call, put }) {
            const response = yield call(restService.getArticleList, payload);
            yield put({ type: 'getArticle', payload: response.Data });
        },

        * getTagList({},{ call ,put }) {
            const response = yield call(restService.getTagList);
            yield put({ type:'getTag', payload: response.Data });
        }
    },
    reducers:{
        getArticle(state,action){
            return {
                ...state,
                articleList: action.payload.articleList
            }
        },

        getTag(state,action){
            console.log('action:',action);
            return {
                ...state,
                tagList: action.payload.tagList
            }
        }
    }
}

export default model;
