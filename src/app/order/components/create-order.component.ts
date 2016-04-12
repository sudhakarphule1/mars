import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES, MdDialog} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {Media} from "ng2-material/core/util/media";
//import {order} from "./order.model";
import order =  require("./../interface/OrderModel");
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

import IItem = require("./../interface/Item");
import IAddress = require("./../interface/Address");

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
    directives: [MATERIAL_DIRECTIVES],
})

export class CreateOrder {

  items : Array<IItem>;
  orderDetails: Array<IItem> = new Array();
  orderStage: string = "createOrder";
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";
  orderID: string;

  currentOrder: order = new order();

  constructor(private orders: Orders) {
    orders.getOrders().subscribe(res => this.items = res);
    this.currentOrder.shippingAddress = new IAddress();
    this.currentOrder.billingAddress = new IAddress();
  }

  createOrder(){
    for(var i in this.items){
      if (this.items[i].qty > 0 ){
        this.orderDetails.push(this.items[i]);
      }
    }

    if (this.orderDetails.length == 0){
      this.errorMessage = "You haven't selected any item for your order";
      this.displayError = true;
    }
    else {
      this.orderStage = "preview";
      this.displayError = false;
    }

  }

  removeItem(item){
    var index = this.orderDetails.indexOf(item);
    this.orderDetails.splice(index, 1);
    if(this.orderDetails.length == 0){
      this.orderStage = "createOrder";
    }
  }

  proceedNext(){
    this.currentOrder.items = this.orderDetails;
    this.currentOrder.orderDate = new Date();
    this.currentOrder.completionDate = new Date();
    this.currentOrder.totalAmount = 3434;
    //this.currentOrder.contactNumber = 3452;
    console.log(this.currentOrder);
    this.orderStage = "fullPreview";

  }
  confirmOrder(){
    if(this.orderDetails.length > 0){
      this.orderStage = "basicDetails"
      this.displayError = false;
    }
    else{
      this.errorMessage = "You haven't selected any item for your order";
      this.displayError = true;
    }
    //this.currentOrder.items = this.orderDetails;
    /*this.orders.createOrderFunction(this.currentOrder).subscribe(res => this.items = res);
    console.log(this.items);
    this.successMessage = "Your order has been created The Order ID is :";
    this.orderID = "OR200001";
    this.orderStage = "confirm";
    this.displaySuccess = true;*/
  }

  placeOrder(){
    this.currentOrder.items = this.orderDetails;
    console.log(this.currentOrder);
    this.orders.createOrderFunction(this.currentOrder).subscribe(res => this.items = res);
    console.log(this.items);
  }

  cancelOrder(){
    this.orderDetails = [];
    this.orderStage = "createOrder";
  }
}
