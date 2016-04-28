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
import {SearchService}     from '../../share/components/search.service';
import {ProductsFilterPipe} from "./products-filter.pipe"

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'addItems',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styleUrls: ['app/order/components/add-items.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes:[ProductsFilterPipe]
})

export class AddItems {


  leadId: string;
  items : Array<Item>;
  orderDetails: Array<Item> = new Array();
  task: Task;
  orderStage: string = "createOrder";
  displayError = false;
  search: string = '';
  displaySuccess = false;
  errorMessage: string = "";
  subscription:Subscription;

  currentOrder: Order = new Order();

  constructor(private orders: Orders, params: RouteParams, private searchService: SearchService) {
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
/*    this.subscription =  searchService.applySearch$.subscribe(
      searchString => {
        this.search = searchString;
      }
    );*/
  }

  createOrder(location: Location){
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
      /*location.go('/inbox/createorder/previewItems');*/
      /*window.location.href='/inbox/createorder/previewItems'*/
    }

  }
/*

  onSearchChange(value:string){
    this.searchService.applyFilter(value);
  }
*/

}
