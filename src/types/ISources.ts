import { ISource } from './ISource';

export interface ISources {
  status: string;
  isFetching: boolean;
  sources: ISource[];
}