
import IItem  = require("./../interface/Item");
import IAddress =  require("./../interface/Address");

export class order{
  orderDate: Date;
  completionDate: Date;
  companyName: string;
  status: string;
  orderType: string;
  remarks: string;
  contactPerson: string;
  venderName: string;
  contactNumber: number;
  totalAmount: number;
  items: Array<IItem>;
  shippingAddress: IAddress;
  billingAddress: IAddress;

}


