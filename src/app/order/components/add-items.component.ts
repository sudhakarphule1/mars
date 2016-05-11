import {Component} from 'angular2/core';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
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
  orderStage: string = "createOrder";
  displayError = false;
  search: string = '';
  displaySuccess = false;
  errorMessage: string = "";

  currentOrder: Order;
  oldOrders: Array<Order>;
  private inboxItem;

  constructor(private _router: Router,
              private orders: Orders, params: RouteParams,
              private searchService: SearchService,
              public orderLocalStore : OrderLocalStore) {
    this.leadId = params.get('leadId');
    orders.getAllProducts().subscribe(res => this.items = res);
    this.currentOrder = orderLocalStore.order;
  }

  createOrder(){
    for(var i in this.items){
      if (this.items[i].qty > 0 ){
        this.currentOrder.items.push(this.items[i]);
      }
    }

    if (this.currentOrder.items.length == 0){
      this.errorMessage = "You haven't selected any item for your order";
      this.displayError = true;
    }
    else {
      this.orderStage = "preview";
      this.displayError = false;
      this._router.navigate(['PreviewItems']);
    }
  }

  viewHistory(){
    this.inboxItem = this.orderLocalStore.inboxItem;
    console.log(this.inboxItem);
    this.orders.getLastOrder("Completed", this.inboxItem.fromCompany)
      .subscribe(res => {
        this.orderLocalStore.order = res[0];
        console.log(this.orderLocalStore.order);
        this._router.parent.navigate(['ViewOrder', { orderId: this.orderLocalStore.order._id, cloneOrder: true }])
      });
    ;
  }

}
