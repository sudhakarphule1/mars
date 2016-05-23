/**
 * Created by chetan on 19/5/16.
 */
import {Address} from "./address";

export class Customer  {

  constructor() {
    this.shippingAddress = new Address;
    this.billingAddress = new Address;
  }
  fromCompany: string;
  contactPerson: string;
  contactNumber: number;
  billingAddress: Address;
  shippingAddress: Address;
}
