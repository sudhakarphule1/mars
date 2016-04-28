/**
 * Created by chetan on 27/4/16.
 */
import {Component} from 'angular2/core';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {RouteParams, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {Address} from "../../model/address";
import {Task} from "../../model/task";

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'previewItems',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/preview-items.component.html',
  styleUrls: ['app/order/components/preview-items.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})

export class PreviewItems {

  leadId: string;
  items : Array<Item>;
  orderDetails: Array<Item> = new Array();
  task: Task;
  errorMessage: string = "";
  orderStage: string = "createOrder";

  currentOrder: Order = new Order();

  constructor(private orders: Orders, params: RouteParams) {
    this.leadId = params.get('leadId');
    orders.getAllProducts().subscribe(res => this.items = res);
    this.currentOrder.shippingAddress = new Address();
    this.currentOrder.billingAddress = new Address();
    this.currentOrder.orderDate = new Date();
    this.currentOrder.completionDate = new Date();
    this.task = new Task();
    this.task.assignedOn = new Date();
    this.task.assignedTo = "Swapnil";
    this.task.priority = "High";
  }

  removeItem(item){
    var index = this.orderDetails.indexOf(item);
    this.orderDetails.splice(index, 1);
    if(this.orderDetails.length == 0){
      this.orderStage = "createOrder";
    }
  }

  confirmOrder(){
    if(this.orderDetails.length > 0){
      this.orderStage = "basicDetails";
    }
    else{
      this.errorMessage = "You haven't selected any item for your order";
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

  originalState(){
    this.orderStage='createOrder';
  }

}
