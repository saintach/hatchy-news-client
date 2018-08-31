import { routerReducer }           from 'react-router-redux';
import { combineReducers }         from 'redux';
import everything from './everything';
import selected from './selected';
import topHeadlines from './topHeadlines';

export default combineReducers({
  everything,
  routing: routerReducer,
  selected,
  topHeadlines,
});