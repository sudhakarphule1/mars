import {InboxItem} from "./inbox-item";
import {Task} from "./task";

export class Email extends InboxItem {
  _id: string;
  html : string;
  text : string;
  subject : string;
  from : Array<any>;
  to : Array<any>;
  date : Date;
  receivedDate : Date;
  attachments : Array<any>;
  messageId : string;
  conversation: Array<any>;

  constructor() {
    super('Email');
  }

  search(searchFor : string) : boolean{
    return this.from[0].address.toLowerCase().search(searchFor) !== -1
      || this.to[0].address.toLowerCase().search(searchFor) !== -1
      || this.to[0].name.toLowerCase().search(searchFor) !== -1
      || this.from[0].name.toLowerCase().search(searchFor) !== -1
      || this.subject.toLowerCase().search(searchFor) !== -1
      || this.text.toLowerCase().search(searchFor) !== -1;
  }
}
