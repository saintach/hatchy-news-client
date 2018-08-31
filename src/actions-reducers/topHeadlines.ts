import { IAction } from '../types/IRedux';
import { ITopHeadlines } from '../types/ITopHeadlines';
import Request, { IQueryParam, RequestMethod } from '../utils/requestAPI';
import {
  GET_TOP_HEADLINES_FAILURE,
  GET_TOP_HEADLINES_REQUEST,
  GET_TOP_HEADLINES_SUCCESS
} from './constants';

// ===== Reducers =====
const initialState: ITopHeadlines =
{
  articles: [],
  isFetching: true,
  status: 'ok',
  totalResults: 0,
};

const TopHeadlines = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_TOP_HEADLINES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_TOP_HEADLINES_FAILURE:
      return {
        error: action.error,
        ...state,
        isFetching: false,
      };

    case GET_TOP_HEADLINES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
      };

    default:
      return state;
  }
};

export default TopHeadlines;


// ===== Actions =====
export interface ILoadTopHeadlines
{
  // tslint:disable-next-line:callable-types
  (queryParams?: IQueryParam[]):
  {
    types: Array<GET_TOP_HEADLINES_REQUEST|GET_TOP_HEADLINES_SUCCESS|GET_TOP_HEADLINES_FAILURE>,
    callAPI: () => {}
  };
}


export const loadTopHeadlines = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `/top-headlines`, queryParams),
    payload: { queryParams },
    types: [GET_TOP_HEADLINES_REQUEST, GET_TOP_HEADLINES_SUCCESS, GET_TOP_HEADLINES_FAILURE],
  };
};
