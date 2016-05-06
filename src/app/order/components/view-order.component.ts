import {Component, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {OrderLocalStore} from "../components/order-local-store";

import {Order} from "../../model/order";
import {OrderHeader} from "./order-header.component";
import {EditOrder} from "./edit-order.component";
import {PreviewCurrentItems} from "./preview-current-order.component";

@Component({
  selector: 'ib-preview-order',
  templateUrl: 'app/order/components/view-order.component.html',
  styleUrls: ['app/order/components/view-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, OrderHeader, EditOrder, PreviewCurrentItems],
})

export class ViewOrder implements OnInit{
  currentOrder : Order = new Order();
  message: string = "";
  orderState: string = "orderPreview";
  displayMessage: boolean = false;
  id: string;
  constructor(private orders: Orders,
              private orderLocalStore: OrderLocalStore,
              params: RouteParams) {
    this.id = params.get('orderId');
    /*orderLocalStore.order = this.currentOrder;*/
  }

  ngOnInit() {
    this.orders.getOrderById(this.id).subscribe(res => {
      this.orderLocalStore.order = res;
      this.currentOrder = res;
    });
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
