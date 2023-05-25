import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor() {}

  private addHeaders(req: HttpRequest<any>): HttpRequest<any> {
    let headers: any;

    if (req.headers) {
      headers = {
        ...req.headers,
      };
    }

    if (headers) {
      return req.clone({ setHeaders: headers });
    }

    return req;
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (req.url.includes('/oauth')) {
      return next.handle(req);
    }

    if (req.url.indexOf(environment.baseUrl) > -1) {
      return next.handle(this.addHeaders(req)).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(req, next);
              case 403:
                return this.handle403Error(req, next);
            }

            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private handle400Error(error: any): Observable<any> {
    if (
      error &&
      error.status === 400 &&
      error.error &&
      error.error.error === 'invalid_grant'
    ) {
      console.error(error);
    }

    return of(new HttpHeaderResponse({ status: 400 }));
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return of(new HttpHeaderResponse({ status: 401 }));
  }

  private handle403Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return of(new HttpHeaderResponse({ status: 403 }));
  }
}
