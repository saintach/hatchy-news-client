
import { Action, Dispatch } from 'redux';


interface IActionObj {
  types: string[];
  callAPI: any;
  shouldCallAPI: (arg?: any) => void;
  payload: object;
}


export default function callAPIMiddleware({ dispatch, getState  }: {dispatch: Dispatch<Action>, getState: () => void}) {
  return (next: (arg?: any) => void) => (action: IActionObj) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    }
    = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (types.length !== 3) {
      throw new Error('Expected an array of three string types.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    );

    return callAPI().then(
      (response: any) =>
        dispatch(
          Object.assign({}, payload, {
            response,
            type: successType
          })
        )
    ).catch(
      (error: any) => {
        dispatch(
          Object.assign({}, payload, {
            error: {
              body: error.body,
              error: error.error,
              message: error.message,
              status: error.status,
            },
            type: failureType
          })
        );
      }
    );
  };
}