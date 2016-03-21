import {AudioContent} from "../inbox.model";
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class AudioDataProvider implements DataProvider {
  constructor (private http: Http) {}

  private _url = '/app/inbox/data-providers/audio-contents-mock.json';  // URL to web api

  getAll() {
    return this.http.get(this._url)
      .map(res => <AudioContent[]> res.json().data)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error.json().error || 'Server error');
  }
}
