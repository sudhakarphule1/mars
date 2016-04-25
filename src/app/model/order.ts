import {InboxItem} from "./inbox-item";
import {Item} from "./item";
import {Address} from "./address";

export class Order extends InboxItem {
  constructor() {
    super('Order');
    this.shippingAddress = new Address;
    this.billingAddress = new Address;
    this.orderDate = new Date();
    this.completionDate = new Date();
  }

  orderDetails:string;
  orderDate:Date;
  completionDate:Date;
  status:string;
  orderType:string;
  r
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
