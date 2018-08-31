import { routerReducer }           from 'react-router-redux';
import { combineReducers }         from 'redux';
import selected from './selected';
import topHeadlines from './topHeadlines';

export default combineReducers({
  routing: routerReducer,
  selected,
  topHeadlines,
});