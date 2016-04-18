
import IItem  = require("../classes/Item");
import IAddress =  require("../classes/Address");

export class order{
  orderDate: Date;
  completionDate: Date;
  companyName: string;
  status: string;
  orderType: string;
  remarks: string;
  contactPerson: string;
  vendorName: string;
  contactNumber: number;
  totalAmount: number;
  items: Array<IItem>;
  shippingAddress: IAddress;
  billingAddress: IAddress;

}


