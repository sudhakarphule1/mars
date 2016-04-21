import {Task} from "./task";

export abstract class InboxItem {
  id:string;
  type:string;
  date:Date;
  fromCompany:string;
  defaultTask:Task;

  constructor(type:string) {
    this.type = type;
    this.defaultTask = new Task;
  }

  abstract search(searchFor : string) : boolean;
}
