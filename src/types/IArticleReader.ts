export interface IArticleReader {
  headers: object;
  article: {
    length: number;
    title: string;
    content: string;
  };
  isFetching: boolean;
  embeddable: boolean;
}