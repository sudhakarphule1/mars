import {AudioContent} from "../inbox.model";
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Observable}     from 'rxjs/Observable';
import {Task} from "../inbox.model";

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
            var defaultTask : Task = new Task(item.defaultTask.assignedOn, item.defaultTask.assignedTo,
              item.defaultTask.status, item.defaultTask.completeBy, item.defaultTask.priority);
            var audioContent : AudioContent= new AudioContent(item.id, item.from, item.subject,
              new Date(item.date), item.attachment, item.fromCompany, defaultTask);
            result.push(audioContent);
          });
        }
        return result;
      });
  }
}
