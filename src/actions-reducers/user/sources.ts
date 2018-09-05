import { IAction } from '../../types/IRedux';
// import { IAuth } from '../../types/user/IAuth';
import Request, { IQueryParam, RequestMethod } from '../../utils/requestAPI';
import {
  GET_USER_SOURCES_FAILURE,
  GET_USER_SOURCES_REQUEST,
  GET_USER_SOURCES_SUCCESS,
  SAVE_USER_SOURCE_FAILURE,
  SAVE_USER_SOURCE_REQUEST,
  SAVE_USER_SOURCE_SUCCESS
} from '../constants';

// ===== Reducers =====
const initialState: any =
{
  username: ''
};

const articles = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_USER_SOURCES_REQUEST:
    case GET_USER_SOURCES_SUCCESS:
    case GET_USER_SOURCES_FAILURE:
    case SAVE_USER_SOURCE_REQUEST:
    case SAVE_USER_SOURCE_SUCCESS:
    case SAVE_USER_SOURCE_FAILURE:
    default:
      return state;
  }
};

export default articles;


// ===== Actions =====
export interface IGetUserSources
{
  // tslint:disable-next-line:callable-types
  (queryParams: IQueryParam[]):
  {
    types: Array<GET_USER_SOURCES_SUCCESS|GET_USER_SOURCES_FAILURE|GET_USER_SOURCES_REQUEST>,
    callAPI: () => {}
  };
}


export const getUserSources = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `/user/sources`, queryParams),
    payload: { queryParams },
    types: [GET_USER_SOURCES_SUCCESS, GET_USER_SOURCES_FAILURE, GET_USER_SOURCES_REQUEST],
  };
};

export interface ISaveUserSource
{
  // tslint:disable-next-line:callable-types
  (queryParams: any):
  {
    types: Array<SAVE_USER_SOURCE_REQUEST|SAVE_USER_SOURCE_SUCCESS|SAVE_USER_SOURCE_FAILURE>,
    callAPI: () => {}
  };
}

export const SaveUserSource = (body: any) => {
  return {
    callAPI: () => Request.send(RequestMethod.PUT, `/user/sources`, undefined, false, body),
    payload: { },
    types: [SAVE_USER_SOURCE_REQUEST, SAVE_USER_SOURCE_SUCCESS, SAVE_USER_SOURCE_FAILURE],
  };
};

