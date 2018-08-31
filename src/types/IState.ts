import { RouterState } from 'react-router-redux';
import { IEverything } from './IEverything';
import { ISelected } from './ISelected';
import { ISources } from './ISources';
import { ITopHeadlines } from './ITopHeadlines';
export interface IState extends RouterState {
  sources: ISources;
  topHeadlines: ITopHeadlines;
  everything: IEverything;
  selected: ISelected;
}