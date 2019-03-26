import { actionTypes } from "./action-types";
import * as restService from "../servers/api"

export const userLogin = async(dispatch, params) => {
  const res = await restService.login(params);
  return dispatch({ type: actionTypes.USER_LOGIN, loginInfo: res.Data })
}