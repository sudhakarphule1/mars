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
  id: string;
  html : string;
  text : string;
  subject : string;
  from : Array<any>;
  to : Array<any>;
  date : Date;
  receivedDate : Date;
  attachments : Array<any>;

  constructor(id: string, html : string, text : string, subject : string, from : Array<any>,
    to : Array<any>, date : Date, receivedDate : Date, attachments : Array<any>) {
    super(id, 'Email', receivedDate, "tcs", {
      "priority" : "High",
      "assignedTo" : "Swapnil",
      "status": "Pending",
      "completeBy" : new Date("2016-04-18T05:53:00.427Z"),
      "assignedOn" : new Date("2016-04-18T05:53:00.427Z")
    });
    this.id = id;
    this.html = html;
    this.text = text;
    this.subject = subject;
    this.from = from;
    this.to = to;
    this.date = date;
    this.receivedDate = receivedDate;
    this.attachments = attachments;
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
    console.log(Order);
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
