/**
 * Created by chetan on 19/5/16.
 */
import {Address} from "./address";
import {Contract} from "./contract"

export class Customer  {

  constructor() {
    this.shippingAddress = new Array<Address>();
    this.billingAddress =  new Array<Address>();
    this.contract = new Array<Contract>();
  }
  _id: string;
  fromCompany: string;
  contactPerson: string;
  contactNumber: number;
  billingAddress: Array<Address>;
  shippingAddress: Array<Address>;
  contract: Array<Contract>;
}
