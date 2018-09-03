export interface ISelected {
  headlineType: string;
  articleUrl: string;
  sourceId: string;
  topHeadlinesParams: {
    q: string;
    category: string;
    country: string;
  };
  everythingParams: {
    q: string;
    language: string;
  },
  currentPage: number;
}