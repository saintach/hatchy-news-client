import { routerReducer }           from 'react-router-redux';
import { combineReducers }         from 'redux';
import topHeadlines from './topHeadlines';

export default combineReducers({
  routing: routerReducer,
  topHeadlines,
});