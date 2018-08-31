import { IEverything } from '../types/IEverything';
import { IAction } from '../types/IRedux';
import Request, { IQueryParam, RequestMethod } from '../utils/requestAPI';
import {
  GET_EVERYTHING_FAILURE,
  GET_EVERYTHING_REQUEST,
  GET_EVERYTHING_SUCCESS
} from './constants';

// ===== Reducers =====
const initialState: IEverything =
{
  articles: [],
  isFetching: true,
  status: 'ok',
  totalResults: 0,
};

const Everything = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_EVERYTHING_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_EVERYTHING_FAILURE:
      return {
        error: action.error,
        ...state,
        isFetching: false,
      };

    case GET_EVERYTHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
      };

    default:
      return state;
  }
};

export default Everything;


// ===== Actions =====
export interface ILoadEverything
{
  // tslint:disable-next-line:callable-types
  (queryParams?: IQueryParam[]):
  {
    types: Array<GET_EVERYTHING_REQUEST|GET_EVERYTHING_SUCCESS|GET_EVERYTHING_FAILURE>,
    callAPI: () => {}
  };
}


export const loadEverything = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `/everything`, queryParams),
    payload: { queryParams },
    types: [GET_EVERYTHING_REQUEST, GET_EVERYTHING_SUCCESS, GET_EVERYTHING_FAILURE],
  };
};
