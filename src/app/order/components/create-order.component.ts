import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES, MdDialog} from "ng2-material/all";
import order =  require("../classes/OrderModel");
import {FORM_DIRECTIVES} from "angular2/common";

import IItem = require("../classes/Item");
import IAddress = require("../classes/Address");
import ITask = require("../classes/Task");
import {RouteParams} from "angular2/router";

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
})

export class CreateOrder {
  leadId: string;
  items : Array<IItem>;
  orderDetails: Array<IItem> = new Array();
  task: ITask;
  orderStage: string = "createOrder";
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";
  orderID: string;

  currentOrder: order = new order();

  constructor(private orders: Orders, params: RouteParams) {
    this.leadId = params.get('leadId');
    console.log("Invoked CreateOrder for : " + this.leadId);
    orders.getAllProducts().subscribe(res => this.items = res);
    this.currentOrder.shippingAddress = new IAddress();
    this.currentOrder.billingAddress = new IAddress();
    this.currentOrder.orderDate = new Date();
    this.currentOrder.completionDate = new Date();
    this.task = new ITask();
    this.task.assignedOn = new Date();
    this.task.assignedTo = "Swapnil";
    this.task.priority = "High";
  }

  createOrder(){
    console.log(this.task.completeBy);
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
    this.currentOrder.task = this.task;
    this.currentOrder.totalAmount = 3434;
    if(!this.currentOrder.companyName || !this.currentOrder.orderType || !this.currentOrder.remarks ||
      !this.currentOrder.contactPerson || !this.currentOrder.vendorName || !this.currentOrder.contactNumber ||
      !this.currentOrder.shippingAddress.line1 || !this.currentOrder.shippingAddress.line2 ||
      !this.currentOrder.shippingAddress.pinCode || !this.currentOrder.shippingAddress.city ||
      !this.currentOrder.shippingAddress.state || !this.currentOrder.shippingAddress.country ||
      !this.currentOrder.billingAddress.line1 || !this.currentOrder.billingAddress.line2 ||
      !this.currentOrder.billingAddress.pinCode || !this.currentOrder.billingAddress.city ||
      !this.currentOrder.billingAddress.state || !this.currentOrder.billingAddress.country ||
      !this.task.completeBy || !this.task.status){
      this.errorMessage = "One of the mandatory fields is missing";
      this.displayError = true;
    }
    else if (isNaN(this.currentOrder.contactNumber)){
      this.errorMessage = "Contact Number needs to be numeric";
      this.displayError = true;
    }
    else if (!isNaN(this.currentOrder.contactNumber) &&
      (isNaN(this.currentOrder.billingAddress.pinCode) || isNaN(this.currentOrder.shippingAddress.pinCode))){
      this.errorMessage = "Pin Code needs to be numeric";
      this.displayError = true;
    }
    else{
      this.orderStage = "fullPreview";
      this.displayError = false;
    }
  }

  confirmOrder(){
    if(this.orderDetails.length > 0){
      this.orderStage = "basicDetails";
      this.displayError = false;
    }
    else{
      this.errorMessage = "You haven't selected any item for your order";
      this.displayError = true;
    }
  }

  goToPrevious(){
    if (this.orderStage === 'preview'){
      this.orderStage = 'createOrder'
    }
    else if (this.orderStage === 'basicDetails'){
      this.orderStage = 'preview'
    }
  }

  cancelOrder(){
    this.orderStage = "createOrder";
    this.orderDetails = [];
    for(var i in this.items){
      this.items[i].qty = 0 ;
    }
  }

  copyAddress(){
    this.currentOrder.billingAddress.line1 = this.currentOrder.shippingAddress.line1;
    this.currentOrder.billingAddress.line2 = this.currentOrder.shippingAddress.line2;
    this.currentOrder.billingAddress.pinCode = this.currentOrder.shippingAddress.pinCode;
    this.currentOrder.billingAddress.city = this.currentOrder.shippingAddress.city;
    this.currentOrder.billingAddress.state = this.currentOrder.shippingAddress.state;
    this.currentOrder.billingAddress.country = this.currentOrder.shippingAddress.country;
  }

  originalState(){
    this.orderStage='createOrder';
    this.displaySuccess = false
  }

  placeOrder(){
    this.currentOrder.items = this.orderDetails;
    console.log(this.currentOrder);
    this.orders.createOrderFunction(this.currentOrder).subscribe(res => this.items = res);
    this.successMessage = "Your order has been created.";
    this.displaySuccess = true;
    this.orders.getAllOrdersFunction();
  }

}
