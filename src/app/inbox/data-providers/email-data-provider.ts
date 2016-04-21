import {Injectable}     from 'angular2/core';
import {DataProvider}   from "./data-provider";
import {RequestOptions} from "angular2/http";

import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
import {Email} from "../../model/email";
/*import any = jasmine.any;*/

@Injectable()
export class EmailDataProvider implements DataProvider {
  constructor (private http: Http) {}

  //private _url = '/app/inbox/data-providers/emails-mock.json';  // URL to web api
  private _url = 'http://localhost:5000/emails';

  getAll() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this._url, {
        headers: headers
      })
      .map(
        res =>  {
          var arrayList:Array<any>  = res.json();
          let result:Array<Email> = [];
          if (arrayList) {
            arrayList.forEach((item)=> {
              console.log( item );

              var email = new Email();
              email.id = item._id;
              email.html = item.html;
              email.text = item.text;
              email.subject = item.subject;
              email.from = item.from;
              email.to = item.to;
              email.date = item.date;
              email.receivedDate = item.receivedDate;
              email.attachments = item.attachments;
              email.defaultTask = item.defaultTask;

              console.log( email );

              result.push(email);
            });
          }
          return result;
         }
        // err => console.log(err),
        // () => console.log('Secret Quote Complete')
      );
  }
}

/*return this.http.get(url).map((res) => res.json());*/
/*return this.http.get(this._url)
 // initial transform - result to json
 .map(res => res.json().data)
 // next transform - each element in the
 // array to a Typed class instance
 .map((arrayList: Array<any>) => {
 let result:Array<Email> = [];
 if (arrayList) {
 arrayList.forEach((item) => {
 var defaultTask : Task = new Task(item.defaultTask.assignedOn, item.defaultTask.assignedTo,
 item.defaultTask.status, item.defaultTask.completeBy, item.defaultTask.priority);
 var email = new Email(  item.id,  item.from, item.to,
 item.cc, item.subject,
 item.body, new Date( item.date),
 item.attachments, item.fromCompany, defaultTask);
 result.push(email);
 });
 }
 return result;
 });*/
