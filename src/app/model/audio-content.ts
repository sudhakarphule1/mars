import {InboxItem} from "./inbox-item";
import {Task} from "./task";

export class AudioContent extends InboxItem {
  constructor() {
    super('AudioContent');
  }

  from:string;
  date:Date;
  subject:string;
  attachment:string;

  search(searchFor : string) : boolean{
    return this.from.toLowerCase().search(searchFor) !== -1
      || this.subject.toLowerCase().search(searchFor) !== -1;
  }
}
