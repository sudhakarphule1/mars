/**
 * Created by chetan on 27/4/16.
 */
import {Component} from 'angular2/core';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Address} from "../../model/address";
import {Task} from "../../model/task";
import {SearchService}     from '../../share/components/search.service';
import {ProductsFilterPipe} from "./products-filter.pipe"

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Router} from "angular2/router";
import {OrderLocalStore} from "./order-local-store";

@Component({
  selector: 'addItems',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styles: [ require('./view-order.scss') ],
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

  currentOrder: Order;

  constructor(private _router: Router,
              private orders: Orders, params: RouteParams,
              private searchService: SearchService,
              private orderLocalStore : OrderLocalStore) {
    this.leadId = params.get('leadId');
    orders.getAllProducts().subscribe(res => this.items = res);
    this.currentOrder = orderLocalStore.order;
    console.log(this.currentOrder);


    this.task = new Task();
    this.task.assignedOn = new Date();
    this.task.assignedTo = "Swapnil";
    this.task.priority = "High";
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
      this._router.navigate(['PreviewItems']);
    }

  }
/*

  onSearchChange(value:string){
    this.searchService.applyFilter(value);
  }
*/

}
