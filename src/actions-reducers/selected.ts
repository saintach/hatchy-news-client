import { IAction } from '../types/IRedux';
import { ISelected } from '../types/ISelected';
import {
  SELECT_ARTICLE_URL,
  SELECT_EVERYTHING_PARAMS,
  SELECT_HEADLINE,
  SELECT_TOP_HEADLINES_PARAMS
} from './constants';

// ===== Reducers =====
const initialState: ISelected =
{
  articleUrl: '',
  everythingParams: {
    language: 'en',
    q: 'breaking',
  },
  headlineType: 'top',
  sourceId: '',
  topHeadlinesParams: {
    category: 'general',
    country: 'us',
    q: '',
  }
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
    case SELECT_EVERYTHING_PARAMS:
      return {
        ...state,
        everythingParams: action.response
      };
    case SELECT_TOP_HEADLINES_PARAMS:
      return {
        ...state,
        topHeadlinesParams: action.response
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

export interface ISelectEverythingParams
{
  // tslint:disable-next-line:callable-types
  (type: object):
  {
    types: string,
    response: object
  };
}

export const selectEverythingParams = (n: object) => {
  return {
    response: n,
    type: SELECT_EVERYTHING_PARAMS,
  };
};

export interface ISelectTopHeadlinesParams
{
  // tslint:disable-next-line:callable-types
  (type: object):
  {
    types: string,
    response: object
  };
}

export const selectTopHeadlinesParams = (n: object) => {
  return {
    response: n,
    type: SELECT_TOP_HEADLINES_PARAMS,
  };
};


