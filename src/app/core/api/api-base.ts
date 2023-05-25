import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export abstract class ApiBase {
  protected abstract routePath: string;
  protected apiBaseUrl: string;
  protected version: string = '';

  constructor(protected httpClient: HttpClient) {
    this.apiBaseUrl = environment.baseUrl;
  }

  protected get<TResult>(
    path: string,
    options?: ApiBase.Options
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      return this.httpClient.get<TResult>(url, options).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => this.errorHandler(error, reject)
      );
    });
  }

  protected post<TResult>(
    path: string,
    content?: any,
    options?: ApiBase.Options
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.post<TResult>(url, content, options).subscribe(
        (result) => resolve(result),
        (error) => this.errorHandler(error, reject)
      );
    });
  }

  protected patch<TResult>(
    path: string,
    content?: any,
    options?: ApiBase.Options
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.patch<TResult>(url, content, options).subscribe(
        (result) => resolve(result),
        (error) => this.errorHandler(error, reject)
      );
    });
  }

  protected put<TResult>(
    path: string,
    content?: any,
    options?: ApiBase.Options
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.put<TResult>(url, content, options).subscribe(
        (result) => resolve(result),
        (error) => this.errorHandler(error, reject)
      );
    });
  }

  protected delete<TResult>(
    path: string,
    content?: any,
    options?: ApiBase.Options
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      if (content) {
        (options as any).body = content;
      }

      this.httpClient.delete<TResult>(url, options).subscribe(
        (result) => resolve(result),
        (error) => this.errorHandler(error, reject)
      );
    });
  }

  private errorHandler(error: any, onError: (reason: any) => void): void {
    if (onError) {
      let errorMessage = new ApiBase.ErrorMessage();

      if (error instanceof HttpErrorResponse) {
        let err = error.error;
        if (err && typeof err === 'string') {
          err = JSON.parse(err);
        }

        errorMessage = Object.assign<
          ApiBase.ErrorMessage,
          ApiBase.ErrorMessage
        >(errorMessage, err);
      } else {
        errorMessage.message = JSON.stringify(error);
      }

      onError(errorMessage);
    }
  }

  protected buildHeader(auth: boolean = false): {
    [header: string]: string | string[];
  } {
    var headers: any = {
      'Accept-Language': 'pt-BR',
    };

    if (auth) {
      headers.Authorization = 'true';
    }

    return headers;
  }

  private prepareOptions(options?: ApiBase.Options): ApiBase.Options {
    if (!options) {
      options = {};
    }

    if (options.headers) {
      options.headers = Object.assign(this.buildHeader(true), options.headers);
    } else {
      options.headers = this.buildHeader(true);
    }

    return options;
  }

  protected buildURL(path: string): string {
    let url = this.apiBaseUrl;

    if (!url.endsWith('/')) {
      url += '/';
    }

    url += this.version;

    if (!url.endsWith('/')) {
      url += '/';
    }

    url += this.routePath;

    if (!path) {
      return url;
    }

    if (!url.endsWith('/') && !path.startsWith('/')) {
      url += '/';
    }

    return url + path;
  }
}

export namespace ApiBase {
  export type Options = {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    withCredentials?: boolean;
  };

  export class QueryFilter {
    page: number = 0;
    size: number = 0;
    search: string = '';
    sort: string[] = [];
  }

  export class ErrorMessage {
    public message: string = '';
    public error: string = '';
    public invalidField: string = '';
  }

  export class ListViewModel<TItem> {
    public totalElements: number = 0;
    public totalPages: number = 0;
    public first: boolean = false;
    public last: boolean = false;
    public number: number = 0;
    public numberOfElements: number = 0;
    public size: number = 0;
    public empty: boolean = false;
    public content: TItem[] = [];
  }

  export class Pageable {
    public pageNumber: number = 0;
    public pageSize: number = 0;
    public offset: number = 0;
    public paged: boolean = false;
    public unpaged: boolean = false;
    public sort: Sort = new Sort();
  }

  export class Sort {
    public sorted: boolean = false;
    public unsorted: boolean = false;
    public empty: boolean = false;
  }

  export namespace PaginatedListRequestViewModel {
    export enum SortOrder {
      ASC = 'ASC',
      DESC = 'DESC',
    }
  }
}
