import { IAction } from '../types/IRedux';
import { ISources } from '../types/ISources';
import Request, { IQueryParam, RequestMethod } from '../utils/requestAPI';
import {
  GET_SOURCES_FAILURE,
  GET_SOURCES_REQUEST,
  GET_SOURCES_SUCCESS
} from './constants';

// ===== Reducers =====
const initialState: ISources =
{
  isFetching: true,
  sources: [],
  status: 'ok',
};

const Sources = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case GET_SOURCES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_SOURCES_FAILURE:
      return {
        error: action.error,
        ...state,
        isFetching: false,
      };

    case GET_SOURCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
      };

    default:
      return state;
  }
};

export default Sources;


// ===== Actions =====
export interface ILoadSources
{
  // tslint:disable-next-line:callable-types
  (queryParams?: IQueryParam[]):
  {
    types: Array<GET_SOURCES_REQUEST|GET_SOURCES_SUCCESS|GET_SOURCES_FAILURE>,
    callAPI: () => {}
  };
}


export const loadSources = (queryParams: IQueryParam[]) => {
  return {
    callAPI: () => Request.send(RequestMethod.GET, `/sources`, queryParams),
    payload: { queryParams },
    types: [GET_SOURCES_REQUEST, GET_SOURCES_SUCCESS, GET_SOURCES_FAILURE],
  };
};
