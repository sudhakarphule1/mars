/*
/!**
 * Created by chetan on 16/5/16.
 *!/
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, Router} from 'angular2/router';
import { Observable } from 'rxjs/Observable';
/!*import * as _ from 'lodash'*!/

/!*import {MyApp} from './app/my-app';*!/

class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
              private _router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url,options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
        this._router.navigate(['Login']);
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });

  }
}
*/
import {Http, Headers} from 'angular2/http';
import {Injectable} from "angular2/core";
import {MessageService} from "../services/message.service";
import {Observable} from "rxjs/Observable";
var g_messageService :MessageService;

@Injectable()
export class HttpClient {
  private http;
  constructor(http: Http, private messageService :MessageService) {
    this.http = http;
    g_messageService = this.messageService;
  }

  createAuthorizationHeader(headers:Headers) {
    headers.append('access_token', localStorage.getItem("access_token"));
  }

  get(url) {
    let headers = new Headers();
    var isQuestionPresent : number = url.indexOf("?");
    var newUrl : string;
    if(isQuestionPresent > -1){
      newUrl = url + '&access_token=' + localStorage.getItem("access_token");
    }else{
      newUrl = url + '?access_token=' + localStorage.getItem("access_token");
    }
    //this.createAuthorizationHeader(headers);
    return this.http.get(newUrl, {
      headers: headers
    }).map((response) => {
        localStorage.setItem("access_token", response.json().access_token);
      return response;})
      .catch(this.handleError);

  }
  private handleError (error: any, someting : any) {
    g_messageService.show(JSON.parse(error._body).message);
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).map((response) => {
      localStorage.setItem("access_token", response.json().access_token);
      return response;})
      .catch(this.handleError);;
  }
}
