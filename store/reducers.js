import { actionTypes } from "./action-types";

const exampleInitialState = {}
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return Object.assign({}, state, {
        userInfo: action.loginInfo.name
      });
    default:
      return state
  }
}