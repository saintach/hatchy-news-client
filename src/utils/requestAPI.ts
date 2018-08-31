
export enum RequestMethod
{
  GET    = 'GET',
  POST   = 'POST',
  PUT    = 'PUT',
  DELETE = 'DELETE'
}

export enum SortDirection
{
  ASC  = 'a',
  DESC = 'd'
}

export interface IGetResponse<T>
{
  total:    number;
  pageData: T[];
}


export interface IQueryParam
{
  name:  string;
  value: string;
}

export interface IGetOptions
{
  sort?:    string;
  order?:   SortDirection;
  page?:    number;
  perPage?: number;
  search?:  string;
}


interface IFetchOptions
{
  method:  RequestMethod;
  headers: Headers;
  // tslint:disable-next-line:no-any
  body?:   any;
}


export default class Request
{

  public static convertOptionsToParams(getOptions: IGetOptions)
  {
    const params: IQueryParam[] = [];
    const keys = Object.keys(getOptions);

    for (const key of keys) {
      if (getOptions[key]) {
        params.push({
          name:   key,
          value:  getOptions[key]
        });
      }
    }

    return params;
  }

  public static async send
  (
    method:       RequestMethod,
    path:         string,
    queryParams?: IQueryParam[],
    // tslint:disable-next-line:no-any
    body?:        any,
    isPlainText?: boolean
  )
  {
    const queryString = this.getQueryString(queryParams);
    const fullPath    = `${this.basePath}${path}`;
    const endpoint    = `${fullPath}${queryString}`;

    const fetchOptions: IFetchOptions = {
      headers: this.getDefaultHeaders(method),
      method,
    };

    if (method !== RequestMethod.GET) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(
      endpoint,
      fetchOptions
    )
    .then(response => {
      return this.handleResponseData(response, isPlainText || false);
    })
    .catch(e => {
      if (e.status && e.message && e.error) {
        throw e;
      }
      return this.handleResponseData(e, false);
    });
  }

  private static basePath: string = process.env.REACT_APP_BASE_PATH || 'https://newsapi.org/v2/';

  private static apiKey: string = process.env.NEWS_API_API_KEY || '3b1ac44555a649d4845b0cbae66d1ea4';

  private static getQueryString(queryParams?: IQueryParam[]): string
  {
    let queryString = '';
    if (!queryParams) {
      queryParams = [];
    }
    queryParams.push({
      name: 'apiKey',
      value: this.apiKey
    })
    if (queryParams && queryParams.length > 0) {
      for (const queryParam of queryParams) {
        queryString += (queryString.length ? '&' : '?') + `${queryParam.name}=${queryParam.value}`;
      }
    }

    return queryString;
  }


  private static getDefaultHeaders(method: RequestMethod): Headers
  {
    const defaultHeaders: Headers = new Headers();

    if (method !== RequestMethod.GET) {
      defaultHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    return defaultHeaders;
  }


  private static handleResponseData(response: Response, isPlainText: boolean): any
  {
    switch (response.status) {

      case 200:
      case 201:
        return (isPlainText ? response.text() : response.json());

      // BAD REQUEST
      case 400:
        return response.json().then(error => {
          throw {
            body: error,
            error: 'Bad Request',
            message: 'The request data is invalid.',
            status: response.status,
          };
        });

      // UNAUTHORIZED
      case 401:
        throw {
          error: 'Unauthorized',
          message: 'Access is denied due to invalid credentials.',
          status: response.status,
        };

      // FORBIDDEN
      case 403:
        throw {
          error: 'Forbidden',
          message: 'You don\'t have enough permission to view this.',
          status: response.status,
        };

      // NOT FOUND
      case 404:
        throw {
          error: 'Not Found',
          message: 'The route or the value you enter is not found on the server.',
          status: response.status,
        };

      case 500:
        throw {
          error: 'Internal Server Error',
          message: 'There is something wrong with the server at the moment.',
          status: response.status,
        };

      default:
        try {
          return response.json().then(error =>
            {
              throw {
                error: error.error,
                message: error.message || error.detail,
                status: response.status,
              };
            });
        } catch {
          throw {
            error: 'Unknown Error',
            message: 'Oops! Please check back in a moment.',
            status: 0,
          };
        }
    }
  }
}
