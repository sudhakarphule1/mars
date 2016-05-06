import {Component, Input} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {OrderLocalStore} from "../components/order-local-store";

import {Order} from "../../model/order";

@Component({
  selector: 'or-order-header',
  templateUrl: 'app/order/components/order-header.component.html',
  styleUrls: ['app/order/components/order-header.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class OrderHeader{
  /*currentOrder : Order = new Order();*/
  @Input() currentOrder: Order;
  message: string = "";
  orderState: string = "orderPreview";
  displayMessage: boolean = false;
  id: string;
  constructor(private orders: Orders,
              private orderLocalStore: OrderLocalStore,
              params: RouteParams) {
    this.id = params.get('orderId');
    console.log(this.currentOrder);
  }

  editOrder(){
    this.orders.editOrder(this.currentOrder).subscribe(
      err => this.message = "Your order details have been successfully updated.",
      () => this.message = "Your order details have been successfully updated."
    );
    this.displayMessage = true;
  }

  removeItem(item){
    var index = this.currentOrder.items.indexOf(item);
    this.currentOrder.items.splice(index, 1);
    if(this.currentOrder.items.length == 0){
      this.orderState = "orderPreview";
    }
  }

}
