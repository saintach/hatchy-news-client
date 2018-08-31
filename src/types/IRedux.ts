export interface IAction
{
  type:               string;
  response:           any;
  error?:             any;
  isInfiniteLoading?: boolean;
}