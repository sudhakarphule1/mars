import {User} from "./user";

export class Task {
  _id: string;
  assignedOn:Date;
  assignedTo:User;
  status:string;
  priority:string;
  completeBy:Date;

  constructor() {
    this.assignedTo = new User;
  }
}
