import {Email} from "../inbox.model";
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class EmailDataProvider implements DataProvider {
  constructor (private http: Http) {}

  private _url = '/app/inbox/data-providers/emails-mock.json';  // URL to web api

  getAll() {
    return this.http.get(this._url)
      // initial transform - result to json
      .map(res => res.json().data)
      // next transform - each element in the
      // array to a Typed class instance
      .map((arrayList: Array<any>) => {
        let result:Array<Email> = [];
        if (arrayList) {
          arrayList.forEach((item) => {
            var email = new Email(  item.from, item.to,
                                    item.cc, item.subject,
                                    item.body, new Date( item.date),
                                    item.priority,
                                    item.attachments)
            result.push(email);
          });
        }
        return result;
      });
  }
}
