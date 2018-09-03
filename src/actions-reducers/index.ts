import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import articleReader from './articleReader';
import everything from './everything';
import selected from './selected';
import sources from './sources';
import topHeadlines from './topHeadlines';

export default combineReducers({
  articleReader,
  everything,
  routing: routerReducer,
  selected,
  sources,
  topHeadlines,
});