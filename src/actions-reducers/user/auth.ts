import { IAction } from '../../types/IRedux';
import { IAuth } from '../../types/user/IAuth';
import Request, { RequestMethod } from '../../utils/requestAPI';
import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_USER_AUTH_FAILURE,
  GET_USER_AUTH_REQUEST,
  GET_USER_AUTH_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../constants';

// ===== Reducers =====
const initialState: IAuth =
{
  id: '',
  isFetching: false,
  token: '',
  username: '',
};

const auth = (state = initialState, action: IAction) =>
{
  switch (action.type) {

    case CREATE_USER_REQUEST:
    case GET_USER_AUTH_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response.data,
      };
    case GET_USER_AUTH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.response,
      };
    case UPDATE_USER_SUCCESS:
      // TO-ADD:

    case GET_USER_AUTH_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return {
        error: action.error,
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default auth;


// ===== Actions =====
export interface ICreateUser
{
  // tslint:disable-next-line:callable-types
  (body: object):
  {
    types: Array<CREATE_USER_SUCCESS|CREATE_USER_FAILURE|CREATE_USER_REQUEST>,
    callAPI: () => {}
  };
}


export const createUser = (body: object) => {
  return {
    callAPI: () => Request.send(RequestMethod.POST, `${process.env.REACT_APP_USER_API}api/users/create`, undefined, true, body),
    payload: { },
    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
  };
};

export interface ISignin
{
  // tslint:disable-next-line:callable-types
  (body: object):
  {
    types: Array<GET_USER_AUTH_SUCCESS|GET_USER_AUTH_FAILURE|GET_USER_AUTH_REQUEST>,
    callAPI: () => {}
  };
}


export const signin = (body: object) => {
  return {
    callAPI: () => Request.send(RequestMethod.POST, `${process.env.REACT_APP_USER_API}api/users/login`, undefined, true, body),
    payload: { },
    types: [GET_USER_AUTH_REQUEST, GET_USER_AUTH_SUCCESS, GET_USER_AUTH_FAILURE],
  };
};
