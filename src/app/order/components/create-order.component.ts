import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES, MdDialog} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {Media} from "ng2-material/core/util/media";
import {order} from "./order.model";

import IItem  = require("./../interface/Item");
import IAddress =  require("./../interface/Address");

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders]
})

export class CreateOrder {

  items : Array<IItem>;
  orderDetails: Array<IItem> = new Array();
  orderPreview = false;
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";
  orderID: string;

  currentOrder: order = new order();

  constructor(private orders: Orders) {

    orders.getOrders().subscribe(res => this.items = res);
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
      this.currentOrder.items = this.orderDetails;
      this.currentOrder.orderDate = new Date();
      this.currentOrder.completionDate = new Date();
      this.currentOrder.totalAmount = 3434;
      console.log(this.currentOrder);
      this.orderPreview = true;
      this.displayError = false;
    }

  }

  removeItem(item){
    var index = this.orderDetails.indexOf(item);
    this.orderDetails.splice(index, 1);
    if(this.orderDetails.length == 0){
      this.orderPreview = false;
    }
  }

  confirmOrder(){
    this.orders.createOrderFunction(this.currentOrder).subscribe(res => this.items = res);
    console.log(this.items);
    this.successMessage = "Your order has been created The Order ID is :";
    this.orderID = "OR200001";
    this.orderPreview = false;
    this.displaySuccess = true;
  }

  cancelOrder(){
    this.orderDetails = [];
    this.orderPreview = false;
  }
}
