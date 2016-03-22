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

export class InboxItem {
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
}

export class Order extends InboxItem {
  constructor(id:string,
              companyName:string,
              orderDate:Date,
              completionDate:Date,
              status:string,
              orderType:string,
              orderDetails:string,
              fromCompany:string,
              defaultTask:Task) {
    super(id, 'Order', orderDate, fromCompany, defaultTask);
    this.companyName = companyName;
    this.orderDetails = orderDetails;
    this.orderDate = orderDate;
    this.completionDate = completionDate;
    this.status = status;
    this.orderType = orderType;
  }

  companyName:string;
  orderDetails:string;
  orderDate:Date;
  completionDate:Date;
  status:string;
  orderType:string;
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
}
