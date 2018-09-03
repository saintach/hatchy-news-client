import { IArticleReader } from '../types/IArticleReader';
import { IAction } from '../types/IRedux';
import Request, { IQueryParam, RequestMethod } from '../utils/requestAPI';
import {
  GET_ARTICLE_READER_FAILURE,
  GET_ARTICLE_READER_REQUEST,
  GET_ARTICLE_READER_SUCCESS
} from './constants';

// ===== Reducers =====
const initialState: IArticleReader =
{
  article: {
    content: '',
    length: 0,
    title: ''
  },
  embeddable: true,
  headers: {},
  isFetching: true,
};

const ArticleReader = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_ARTICLE_READER_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_ARTICLE_READER_FAILURE:
      return {
        error: action.error,
        ...state,
        isFetching: false,
      };

    case GET_ARTICLE_READER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
      };

    default:
      return state;
  }
};

export default ArticleReader;


// ===== Actions =====
export interface ILoadReadableArticle
{
  // tslint:disable-next-line:callable-types
  (queryParams?: IQueryParam[]):
  {
    types: Array<GET_ARTICLE_READER_REQUEST|GET_ARTICLE_READER_SUCCESS|GET_ARTICLE_READER_FAILURE>,
    callAPI: () => {}
  };
}


export const loadReadableArticle = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `http://localhost:3001/readability`, queryParams, true),
    payload: { queryParams },
    types: [GET_ARTICLE_READER_REQUEST, GET_ARTICLE_READER_SUCCESS, GET_ARTICLE_READER_FAILURE],
  };
};
