/**
 * Created by chetan on 29/4/16.
 */
/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";
import {Task} from "../../model/task";
import {Email} from "../../model/email";
import {User} from "../../model/user";
import {Config} from "../../../config/config";

@Injectable()
export class EmailService {
  constructor(private http: Http){}


  public getAllEmails(){
    let url = Config.RESTServer + `emails?access_token=`+localStorage.getItem("access_token");
    return this.getEmailObjectFunction(url);
  }

  public replyEmail(value){
    value.access_token= localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    console.log("service parama => "+params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `sendmail`;
    return this.http.post(url, params,options);
  }


  public getEmailObjectFunction(url){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, {
        headers: headers
      })
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((data) => {
        var arrayList: Array<any> = data.result;

        localStorage.setItem("access_token", data.access_token);
        /*console.log(data.access_token);*/
        let result:Array<Email> = [];
        if (arrayList) {
          arrayList.forEach((item) => {
            var defaultTask : Task = new Task();
            defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
            defaultTask.assignedTo = new User();
            defaultTask.assignedTo._id = item.defaultTask.assignedTo._id;
            defaultTask.assignedTo.firstName = item.defaultTask.assignedTo.firstName;
            defaultTask.assignedTo.lastName = item.defaultTask.assignedTo.lastName;
            defaultTask.status = item.defaultTask.status;
            defaultTask.completeBy = new Date(item.defaultTask.completeBy);
            defaultTask.priority = item.defaultTask.priority;

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
            email.defaultTask = defaultTask;
            email.messageId = item.messageId;
            email.conversation = item.conversation;

            result.push(email);
          });
        }
        return result;
      });
  }

}
