import {Task} from "./task";

export abstract class InboxItem {
  id:string;
  type:string;
  date:Date;
  fromCompany:string;
  defaultTask:Task;

  constructor(type:string) {
    this.type = type;
  }

  abstract search(searchFor : string) : boolean;
}
