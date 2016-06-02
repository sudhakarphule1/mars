import * as task from "./task";
/*import NewTask = require ("./task");*/

export abstract class InboxItem {
  _id:string;
  type:string;
  date:Date;
  fromCompany:string;
  defaultTask:task.Task;

  constructor(type:string) {
    this.type = type;
    this.defaultTask = new task.Task;
  }

  abstract search(searchFor : string) : boolean;
}
