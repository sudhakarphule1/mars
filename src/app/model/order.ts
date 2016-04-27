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

  orderDate:Date;
  completionDate:Date;
  status:string;
  orderType:string;
  remarks: string;
  contactPerson: string;
  contactNumber: number;
  totalAmount: number;
  items: Array<Item>;
  shippingAddress: Address;
  billingAddress: Address;

  search(searchFor : string) : boolean{
    var item;
    /*this.items.forEach((item));*/
    //return this.items.toLowerCase().search(searchFor) !== -1;
    return false;
  }

}
