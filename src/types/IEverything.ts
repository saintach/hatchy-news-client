import {IArticle} from './IArticle';

export interface IEverything {
  isFetching: boolean;
  status: string;
  totalResults: number;
  articles: IArticle[];
}