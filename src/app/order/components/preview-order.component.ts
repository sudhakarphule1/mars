import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Order} from "../../model/order";
import {RouteParams, Router} from "angular2/router";
import {OrderLocalStore} from "./order-local-store";
import {Orders} from "../services/order.service";

@Component({
  selector: 'inbox-app',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/preview-order.component.html',
  styleUrls: ['app/order/components/preview-order.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class PreviewOrder {

  leadId: string;
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";

  currentOrder: Order = new Order();
  private response;

  constructor(private orders: Orders,
              params: RouteParams,
              private _router: Router,
              private orderLocalStore : OrderLocalStore) {
    this.leadId = params.get('leadId');
    this.currentOrder = orderLocalStore.order;
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

  placeOrder(){
    console.log(this.currentOrder);
    this.orders.createOrder(this.currentOrder).subscribe(res => this.response = res);
    this.successMessage = "Your order has been created.";
    this.displaySuccess = true;
    /*this.orders.getAllOrdersFunction();*/
  }

}
