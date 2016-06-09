import {Component, OnInit} from 'angular2/core';
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {FORM_DIRECTIVES} from "@angular/common";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {OrderLocalStore} from "../components/order-local-store";

import {Order} from "../../model/order";
import {OrderHeader} from "./order-header.component";
import {EditOrder} from "./edit-order.component";
import {PreviewCurrentItems} from "./preview-current-order.component";

@Component({
  selector: 'ib-preview-order',
  templateUrl: 'app/order/components/view-order.component.html',
  styles: [ require('./common.scss') ],
  providers: [Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, OrderHeader, EditOrder, PreviewCurrentItems],
})

export class ViewOrder implements OnInit{
  currentOrder : Order = new Order();
  message: string = "";
  edit: boolean = false;
  displayMessage: boolean = false;
  saveOrder: boolean = false;
  id: string;
  response;
  cloneOrder: string = '';

  constructor(private orders: Orders,
              private orderLocalStore: OrderLocalStore,
              params: RouteParams) {
    this.id = params.get('orderId');
    this.cloneOrder = params.get('cloneOrder');
    this.orders.getOrderById(this.id).subscribe(res => {
      this.orderLocalStore.order = res;
      this.currentOrder = res;
    });
  }

  ngOnInit() {
  }

  editOrder(){
    console.log(this.currentOrder);
    this.orders.editOrder(this.currentOrder).subscribe(
      err => this.message = "Your order details have been successfully updated.",
      () => this.message = "Your order details have been successfully updated."
    );
    this.displayMessage = true;
  }

  createOrder(){
    console.log(this.currentOrder);
    this.orders.createOrder(this.currentOrder).subscribe(res => this.response = res);
    this.message = "Your order has been created.";
    this.displayMessage = true;
  }
}
