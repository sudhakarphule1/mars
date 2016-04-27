import {Injectable}     from 'angular2/core';
import {DataProvider}   from "./data-provider";
import {RequestOptions} from "angular2/http";
import {Task} from "../../model/task";
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
import {Email} from "../../model/email";

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

              var email = new Email();
              email.id = item._id;
              email.html = item.html;
              email.text = item.text;
              email.subject = item.subject;
              email.from = item.from;
              email.fromCompany = item.fromCompany;
              email.to = item.to;
              email.date = item.date;
              email.receivedDate = item.receivedDate;
              email.attachments = item.attachments;

              var defaultTask : Task = new Task();
              defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
              defaultTask.assignedTo = item.defaultTask.assignedTo;
              defaultTask.status = item.defaultTask.status;
              defaultTask.completeBy = new Date(item.defaultTask.completeBy);
              defaultTask.priority = item.defaultTask.priority;

              email.defaultTask = defaultTask;

              result.push(email);
            });
          }
          return result;
         }
      );
  }
}
