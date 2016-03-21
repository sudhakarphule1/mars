export class InboxItem{
  id: string;
  type : string;
  date : Date;
}

export class Email extends InboxItem{
  constructor(  from: string,
                to: string,
                cc: string,
                subject: string,
                body : string,
                date : Date,
                priority: string,
                attachments: string) {
    super();
    this.type = 'Email';
    this.from = from;
    this.to = to;
    this.cc = cc;
    this.subject = subject;
    this.body = body;
    this.date = date;
    this.priority = priority;
    this.attachments = attachments;
  }
  from: string;
  to: string;
  cc: string;
  subject: string;
  body : string;
  priority: string;
  attachments: string;
}

export class Order extends InboxItem {
  constructor(  companyName: string,
                orderDate: Date,
                completionDate: Date,
                status: string,
                orderType: string,
                orderDetails: string) {
    super();
    this.type = 'Order';
    this.companyName = companyName;
    this.orderDetails = orderDetails;
    this.orderDate = orderDate;
    this.completionDate = completionDate;
    this.status = status;
    this.orderType = orderType;
  }
  companyName: string;
  orderDetails: string;
  orderDate: Date;
  completionDate: Date;
  status: string;
  orderType: string;
}

export class AudioContent extends InboxItem{
  constructor(  from: string,
                subject: string,
                date: Date,
                attachment: string) {
    super();
    this.type = 'AudioContent';
    this.from = from;
    this.date = date;
    this.subject = subject;
    this.attachment = attachment;
  }
  from: string;
  date: Date;
  subject: string;
  attachment: string;
}
