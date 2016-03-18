
import {DataProvider} from "./data-provider";
import {Email} from "../inbox.model";

export class EmailDataProvider implements DataProvider {
  constructor() {
  }

  getAll() {
    var email = new Email();
    email.from = 'admin.clerk@hsbc.com';
    email.to = 'order@parag.com';
    email.cc = 'admin.mgr@hsbc.com';
    email.date = new Date();
    email.subject = 'Montly recurring order';
    email.body = 'Can you see this TODO';
    email.priority = 'Normal';
    email.attachments = 'Attachment 1 TODO';

    var items:Array<any>;
    items = new Array<Email>();
    items.push( email)
    return items;
  }
}
