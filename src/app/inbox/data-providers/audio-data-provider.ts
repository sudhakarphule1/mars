import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Observable}     from 'rxjs/Observable';
import {AudioContent} from "../../model/audio-content";
import {Task} from "../../model/task";

@Injectable()
export class AudioDataProvider implements DataProvider {
  constructor (private http: Http) {}

  private _url = '/app/inbox/data-providers/audio-contents-mock.json';  // URL to web api

  getAll() {
    return this.http.get(this._url)
      // initial transform - result to json
      .map(res => res.json().data)
      // next transform - each element in the
      // array to a Typed class instance
      .map((arrayList: Array<any>) => {
        let result:Array<AudioContent> = [];
        if (arrayList) {
          arrayList.forEach((item) => {
            var defaultTask : Task = new Task();
            defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
            defaultTask.assignedTo = item.defaultTask.assignedTo;
            defaultTask.status = item.defaultTask.status;
            defaultTask.completeBy = new Date(item.defaultTask.completeBy);
            defaultTask.priority = item.defaultTask.priority;

            var audioContent : AudioContent= new AudioContent();

            audioContent.from = item.from;
            audioContent.subject = item.subject;
            audioContent.attachment = item.attachment;
            audioContent.id = item.id;
            audioContent.date =  new Date(item.date);
            audioContent.fromCompany = item.fromCompany;
            audioContent.defaultTask = defaultTask;

            result.push(audioContent);
          });
        }
        return result;
      });
  }
}
