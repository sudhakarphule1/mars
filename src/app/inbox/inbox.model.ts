export class Task {
  assignedOn:Date;
  assignedTo:string;
  status:string;
  priority:string;
  completeBy:Date;

  constructor(assignedOn:Date,
              assignedTo:string,
              status:string,
              completeBy:Date,
              priority:string) {
    this.assignedOn = assignedOn;
    this.assignedTo = assignedTo;
    this.status = status;
    this.completeBy = completeBy;
    this.priority = priority;
  }
}

export abstract class InboxItem {
  id:string;
  type:string;
  date:Date;
  fromCompany:string;
  defaultTask:Task;

  constructor(id:string,
              type:string,
              date:Date,
              fromCompany: string,
              defaultTask:Task) {
    this.id = id;
    this.type = type;
    this.date = date;
    this.fromCompany = fromCompany;
    this.defaultTask = defaultTask;
  }

  abstract search(searchFor : string) : boolean;
}

export class Email extends InboxItem {
  from:string;
  to:string;
  cc:string;
  subject:string;
  body:string;
  priority:string;
  attachments:string;

  constructor(id:string,
              from:string,
              to:string,
              cc:string,
              subject:string,
              body:string,
              date:Date,
              attachments:string,
              fromCompany:string,
              defaultTask:Task) {
    super(id, 'Email', date, fromCompany, defaultTask);
    this.from = from;
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
  }

  search(searchFor : string) : boolean{
    return this.from.toLowerCase().search(searchFor) !== -1
      || this.to.toLowerCase().search(searchFor) !== -1
      || this.cc.toLowerCase().search(searchFor) !== -1
      || this.subject.toLowerCase().search(searchFor) !== -1
      || this.body.toLowerCase().search(searchFor) !== -1;
  }

}

export class Order extends InboxItem {
  constructor(id:string,
              orderDate:Date,
              completionDate:Date,
              orderDetails:string,
              fromCompany:string,
              defaultTask:Task) {
    super(id, 'Order', orderDate, fromCompany, defaultTask);
    this.orderDetails = orderDetails;
    this.orderDate = orderDate;
    this.completionDate = completionDate;
  }

  companyName:string;
  orderDetails:string;
  orderDate:Date;
  completionDate:Date;
  status:string;
  orderType:string;

  search(searchFor : string) : boolean{
    return this.orderDetails.toLowerCase().search(searchFor) !== -1;
  }

}

export class AudioContent extends InboxItem {
  constructor(id: string,
              from:string,
              subject:string,
              date:Date,
              attachment:string,
              fromCompany : string,
              defaultTask: Task) {
    super(id, 'AudioContent', date, fromCompany, defaultTask);
    this.from = from;
    this.subject = subject;
    this.attachment = attachment;
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
