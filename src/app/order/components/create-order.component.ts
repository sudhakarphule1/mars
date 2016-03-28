import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES, MdDialog} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {Media} from "ng2-material/core/util/media";
import {orderDetails, products} from './order.model';

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders]
})

export class CreateOrder {

  myOrders : orderDetails[];
  orderDetails: orderDetails[] = new Array();
  orderPreview = false;
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";
  orderID: string;

  constructor(private orders: Orders) {
    orders.getOrders().subscribe(res => this.myOrders = res);
  }

  createOrder(){

    for(var i in this.myOrders){
      if (this.myOrders[i].quantity > 0 ){
        this.orderDetails.push(this.myOrders[i]);
      }
    }

    if (this.orderDetails.length == 0){
      this.errorMessage = "You haven't selected any item for your order";
      this.displayError = true;
    }
    else {
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
    this.successMessage = "Your order has been created. The Order ID is :";
    this.orderID = "OR200001";
    this.orderPreview = false;
    this.displaySuccess = true;
  }

  cancelOrder(){
    this.orderDetails = [];
    this.orderPreview = false;
  }
}
