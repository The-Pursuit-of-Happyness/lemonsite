import * as restService from "../servers/api"
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const model = {
  namespace: 'user',
  state: {
    userInfo: {},
    appInfo: {},
  },
  effects: {
    * userLogin({ payload }, { call, put }) {
      const response = yield call(restService.login, payload);
      yield put({ type: 'save', payload: response });
    },
    * getAppInfo({ payload }, { call, put }) {
      const response = yield call(restService.getInfo, payload);
      yield put({ type: 'info', payload: response })
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfo: action.payload.Data
      };
    },
    info(state, action) {
      return {
        ...state,
        appInfo: action.payload.Data
      }
    }
  },
};

export default model;