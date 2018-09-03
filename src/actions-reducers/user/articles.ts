import { IAction } from '../../types/IRedux';
import { IAuth } from '../../types/user/IAuth';
import Request, { IQueryParam, RequestMethod } from '../../utils/requestAPI';
import {
  GET_USER_ARTICLES_FAILURE,
  GET_USER_ARTICLES_REQUEST,
  GET_USER_ARTICLES_SUCCESS,
  SAVE_USER_ARTICLE_FAILURE,
  SAVE_USER_ARTICLE_REQUEST,
  SAVE_USER_ARTICLE_SUCCESS
} from '../constants';

// ===== Reducers =====
const initialState: IAuth =
{
  username: ''
};

const articles = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_USER_ARTICLES_REQUEST:
    case GET_USER_ARTICLES_SUCCESS:
    case GET_USER_ARTICLES_FAILURE:
    case SAVE_USER_ARTICLE_REQUEST:
    case SAVE_USER_ARTICLE_SUCCESS:
    case SAVE_USER_ARTICLE_FAILURE:
    default:
      return state;
  }
};

export default articles;


// ===== Actions =====
export interface IGetUserArticles
{
  // tslint:disable-next-line:callable-types
  (queryParams: IQueryParam[]):
  {
    types: Array<GET_USER_ARTICLES_SUCCESS|GET_USER_ARTICLES_FAILURE|GET_USER_ARTICLES_REQUEST>,
    callAPI: () => {}
  };
}


export const getUserArticles = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `/user/articles`, queryParams),
    payload: { queryParams },
    types: [GET_USER_ARTICLES_SUCCESS, GET_USER_ARTICLES_FAILURE, GET_USER_ARTICLES_REQUEST],
  };
};

export interface ISaveUserArticle
{
  // tslint:disable-next-line:callable-types
  (queryParams: any):
  {
    types: Array<SAVE_USER_ARTICLE_REQUEST|SAVE_USER_ARTICLE_SUCCESS|SAVE_USER_ARTICLE_FAILURE>,
    callAPI: () => {}
  };
}

export const SaveUserArticle = (body: any) => {
  return {
    callAPI: () => Request.send(RequestMethod.PUT, `/user/articles`, undefined, false, body),
    payload: { },
    types: [SAVE_USER_ARTICLE_REQUEST, SAVE_USER_ARTICLE_SUCCESS, SAVE_USER_ARTICLE_FAILURE],
  };
};

