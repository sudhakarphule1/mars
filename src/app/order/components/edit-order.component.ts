import {Component, Input} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Order} from "../../model/order";
import {RouteParams, Router} from "angular2/router";
import {Orders} from "../services/order.service";

@Component({
  selector: 'or-edit-order',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/edit-order.component.html',
  styleUrls: ['app/order/components/edit-order.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class EditOrder {

  leadId: string;
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";

  @Input() currentOrder: Order;
  private response;

  constructor(private orders: Orders,
              params: RouteParams,
              private _router: Router) {
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
  }

}
