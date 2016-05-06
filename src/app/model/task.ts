import {User} from "./user";

export class Task {
  assignedOn:Date;
  assignedTo:User;
  status:string;
  priority:string;
  completeBy:Date;

  constructor() {
    /*this.assignedOn = assignedOn;
    this.assignedTo = assignedTo;
    this.status = status;
    this.completeBy = completeBy;
    this.priority = priority;*/
  }
}
