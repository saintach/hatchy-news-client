import {IArticle} from './IArticle';

export interface ITopHeadlines {
  isFetching: boolean;
  status: string;
  totalResults: number;
  articles: IArticle[];
}