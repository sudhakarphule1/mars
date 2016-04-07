/**
 * Created by waqar on 23/3/16.
 */

import IItem = require("./Item");
import Address = require("./Address");


class OrderModel  {

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
    shippingAddress: Address;
    billingAddress: Address;

  /*OrderModel(){
    this.shippingAddress = new Address();
    this.billingAddress = new Address();
  }*/

}

export = OrderModel;
