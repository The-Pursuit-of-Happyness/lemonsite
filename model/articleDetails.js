import * as restService from "../servers/api";

const model = {
    namespace:'articleDetails',
    state:{
        articleDetail:null,
    },
    effects:{
        * getArticleDetail({ payload },{ call,put }){
            const response = yield call(restService.getArticleDetail, payload);
            yield put({ type: 'getArticle', payload: response.Data });
        }
    },
    reducers:{
        getArticle(state,action){
            console.log('action:',action)
            return {
                ...state,
                articleDetail: action.payload.articleDetails,
            }
        }
    },
};

export default model;
