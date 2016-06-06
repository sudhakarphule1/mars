import {Component} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {Order} from "../../model/order";
import {Router, RouteParams} from "@angular/router-deprecated";
import {OrderLocalStore} from "./order-local-store";
import {Orders} from "../services/order.service";
import {Customer} from "../../model/customer";
import {Item} from "../../model/item";
import {Product} from "../../model/product";

@Component({
  selector: 'inbox-app',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/preview-order.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class PreviewOrder {

  leadId: string;
  displayError = false;
  displaySuccess = false;
  successMessage: string = "";

  currentOrder: Order = new Order();
  sendOrder: Order = new Order();
  private response;
  private customer: Customer =  new Customer();

  constructor(private orders: Orders,
              params: RouteParams,
              private _router: Router,
              private orderLocalStore : OrderLocalStore) {
    this.leadId = params.get('leadId');
    this.currentOrder = orderLocalStore.order;
    this.customer = orderLocalStore.customer;
  }

  goToPrevious(){
    this._router.navigate(['AddOtherDetails']);
  }

  cancelOrder(){
    this._router.navigate(['AddItems']);
    this.currentOrder.items = [];
    for(var i in this.currentOrder.items){
      this.currentOrder.items[i].qty = 0 ;
    }
  }

  resetCurrentOrder(){
    this.currentOrder.items = [];
    this.currentOrder.shippingAddress.line1 = "";

  }

  placeOrder(){
    var items: Array<any> = new Array<any>();
    this.currentOrder.items.forEach((item) =>{  // foreach statement
      items.push({productId: item._id, qty: item.qty});
    });
    this.sendOrder = Object.assign({}, this.currentOrder);
    this.sendOrder.items = items;
    console.log("send order:" + JSON.stringify(this.sendOrder));
    this.orders.createOrder(this.sendOrder).subscribe(res => this.response = res);
    this.successMessage = "Your order has been created.";
    this.displaySuccess = true;
  }

}
