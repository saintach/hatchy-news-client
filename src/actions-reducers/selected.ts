import { IAction } from '../types/IRedux';
import { ISelected } from '../types/ISelected';
import {
  SELECT_ARTICLE_URL,
  SELECT_HEADLINE,
} from './constants';

// ===== Reducers =====
const initialState: ISelected =
{
  articleUrl: '',
  headlineType: 'top',
  sourceId: '',
};

const Selected = (state = initialState, action: IAction) =>
{
  switch (action.type) {
    case SELECT_ARTICLE_URL:
      return {
        ...state,
        articleUrl: action.response
      };
    case SELECT_HEADLINE:
      return {
        ...state,
        headlineType: action.response
      };

    default:
      return state;
  }
};

export default Selected;

export interface ISelectHeadlineType
{
  // tslint:disable-next-line:callable-types
  (type: string):
  {
    types: string,
    response: string
  };
}


export const selectHeadlineType = (headlineType: string) => {
  return {
    response: headlineType,
    type: SELECT_HEADLINE,
  };
};

export interface ISelectArticleUrl
{
  // tslint:disable-next-line:callable-types
  (type: string):
  {
    types: string,
    response: string
  };
}


export const selectArticleUrl = (url: string) => {
  return {
    response: url,
    type: SELECT_ARTICLE_URL,
  };
};


