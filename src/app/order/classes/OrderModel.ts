/**
 * Created by waqar on 23/3/16.
 */

import IItem = require("./Item");
import Address = require("./Address");
import Task = require("./Task");

class OrderModel  {

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
    shippingAddress: Address;
    billingAddress: Address;
    task: Task;
}

export = OrderModel;
