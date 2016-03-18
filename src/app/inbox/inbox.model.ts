export class InboxItem{
  id: string;
  type : string;
  date : Date;
}

export class Email extends InboxItem{
  constructor() {
    super();
    this.type = 'Email';
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
  constructor() {
    super();
    this.type = 'Order';
  }
  companyName: string;
  orderDetails: string;
  orderDate: Date;
  completionDate: string;
  status: string;
  orderType: string;
}

export class AudioContent extends InboxItem{
  constructor() {
    super();
    this.type = 'AudioContent';
  }
  from: string;
  date: Date;
  subject: string;
  attachment: string;
}
