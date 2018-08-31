// import logger                                   from 'redux-logger';
import createHistory                            from 'history/createBrowserHistory';
import { routerMiddleware }                     from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools }                  from 'redux-devtools-extension';
import thunk                                    from 'redux-thunk';
import rootReducer                              from '../actions-reducers/index';


const history = createHistory();

// LogRocket should be the last middleware
const middleware = [thunk, routerMiddleware(history)];

export default
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );