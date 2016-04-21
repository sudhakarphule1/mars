import {InboxItem} from "./inbox-item";
import {Item} from "./item";
import {Address} from "./address";
import {Task} from "./task";

export class Order extends InboxItem {
  constructor() {
    super('Order');
  }

  companyName:string;
  orderDetails:string;
  orderDate:Date;
  completionDate:Date;
  status:string;
  orderType:string;

  remarks: string;
  contactPerson: string;
  vendorName: string;
  contactNumber: number;
  totalAmount: number;
  items: Array<Item>;
  shippingAddress: Address;
  billingAddress: Address;

  search(searchFor : string) : boolean{
    return this.orderDetails.toLowerCase().search(searchFor) !== -1;
  }

}
