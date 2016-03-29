/**
 * Created by waqar on 23/3/16.
 */

import IItem = require("./Item");
import IAddress = require("./Address");


interface OrderModel  {


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
    shippingAddress: IAddress;
    billingAddress: IAddress;


}

export = OrderModel;
