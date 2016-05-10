import {User} from "./user";

export class Task {
  assignedOn:Date;
  assignedTo:User;
  status:string;
  priority:string;
  completeBy:Date;

  constructor() {
    this.assignedTo = new User;
  }
}
