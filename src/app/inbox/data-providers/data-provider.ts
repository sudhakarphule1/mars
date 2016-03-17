export interface DataProvider {
  getAll();
}

export interface InboxItem{
  id: string;
}

export interface EmailItem{
  from : string;
  subject : string;
  body : string;
}

export interface Order{
  companyName: string,
  orderDetails: string,
  orderDate: string,
  completionDate: string,
  status: string,
  orderType: string
}

export interface Lead{
  from : string;
  subject : string;
  body : string;
}

