/**
 * Created by chetan on 19/5/16.
 */
import {Address} from "./address";

export class Customer  {
  fromCompany: string;
  contactPerson: string;
  contactNumber: string;
  billingAddress: Address;
  shippingAddress: Address;
}
