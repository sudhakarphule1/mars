import {Component, Input} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {OrderLocalStore} from "../components/order-local-store";
import {Order} from "../../model/order";

@Component({
  selector: 'or-preview-current-order',
  templateUrl: 'app/order/components/preview-current-order.component.html',
  styleUrls: ['app/order/components/preview-current-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
})

export class PreviewCurrentItems{
  @Input() currentOrder: Order;

  message: string = "";
  @Input editMode: boolean;
  displayMessage: boolean = false;
  constructor(private orders: Orders) {
  }

  editOrder(){
    this.editMode = true;
/*    this.orders.editOrder(this.currentOrder).subscribe(
      err => this.message = "Your order details have been successfully updated.",
      () => this.message = "Your order details have been successfully updated."
    );
    this.displayMessage = true;*/
  }

  saveOrder(){
    this.orders.editOrder(this.currentOrder).subscribe(
      err => this.message = "Your order details have been successfully updated.",
      () => this.message = "Your order details have been successfully updated."
    );
    this.displayMessage = true;
  }
}
