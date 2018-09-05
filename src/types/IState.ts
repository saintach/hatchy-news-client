import { RouterState } from 'react-router-redux';
import { IArticleReader } from './IArticleReader';
import { IEverything } from './IEverything';
import { ISelected } from './ISelected';
import { ISources } from './ISources';
import { ITopHeadlines } from './ITopHeadlines';
import { IAuth } from './user/IAuth';
// import { IArticles } from './user/IArticles';
export interface IState extends RouterState {
  articleReader: IArticleReader;
  sources: ISources;
  topHeadlines: ITopHeadlines;
  everything: IEverything;
  selected: ISelected;
  user: {
    auth: IAuth;
  }
}