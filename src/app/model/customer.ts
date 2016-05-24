/**
 * Created by chetan on 19/5/16.
 */
import {Address} from "./address";
import {Contract} from "./contract"

export class Customer  {

  constructor() {
    this.shippingAddress = new Address;
    this.billingAddress = new Address;
    this.contract = new Array<Contract>();
  }
  fromCompany: string;
  contactPerson: string;
  contactNumber: number;
  billingAddress: Address;
  shippingAddress: Address;
  contract: Array<Contract>;
}
