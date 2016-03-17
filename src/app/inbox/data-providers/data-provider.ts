export interface DataProvider {
  getAll();
}

export class InboxItem{
  id: string;
  type : string;
}

export class Email extends InboxItem{
  constructor() {
    super();
    this.type = 'Email';
  }
  from: string;
  to: string;
  cc: string;
  date : string;
  subject: string;
  body : string;
  priority: string;
  attachments: string
}

export class Order extends InboxItem {
  constructor() {
    super();
    this.type = 'Order';
  }
  companyName: string;
  orderDetails: string;
  orderDate: string;
  completionDate: string;
  status: string;
  orderType: string
}
