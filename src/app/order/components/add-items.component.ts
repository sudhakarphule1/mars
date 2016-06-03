import {Component, Input} from 'angular2/core';
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
  selector: 'add-items',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes:[ProductsFilterPipe]
})

export class AddItems {

  items : Array<Item>;
  displayError = false;
  showProducts: boolean = false;
  search: string = '';
  displaySuccess = false;
  errorMessage: string = "";
  totalAmount: number = 0;
  selectedItems: Array<Item> = new Array<Item>();
  @Input currentOrder: Order;

  constructor(private orders: Orders,
              private searchService: SearchService,
              public orderLocalStore : OrderLocalStore) {
    /*this.leadId = params.get('leadId');*/
    orders.getAllProducts()
      .subscribe(res => {this.items = res;
        /*orderLocalStore.items = this.items;*/
        for(var i in this.items){
            this.items[i].amount = 0;
        }
      });
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
      this.displayError = false;
    }
  }

  selectThisItem(value){

    for (var i = 0; i < this.items.length; i++)
    {
      if (this.items[i]._id === value._id) {
        this.errorMessage = "You have already selected this product.";
        this.displayError = true;
      }
      else{
        {break;}
      }
    }
    this.selectedItems.push(value);

    var index = this.items.indexOf(value);
    if(index > -1){
      this.items.splice(index, 1);
    }
    console.log(this.items);
  }

  getTotalAmount(){
/*    this.selectedItems.forEach(item){
      this.totalAmount
    }*/
    this.totalAmount = 0;

    for(var i = 0; i < this.selectedItems.length; i++){
      this.totalAmount += this.selectedItems[i].amount;
    }
    console.log(this.totalAmount);
  }

/*  viewHistory(){
    this.inboxItem = this.orderLocalStore.inboxItem;
    console.log(this.inboxItem);
    this.orders.getLastOrder("Completed", this.inboxItem.fromCompany)
      .subscribe(res => {
        this.orderLocalStore.order = res[0];
        console.log(this.orderLocalStore.order);
        this._router.parent.navigate(['ViewOrder', { orderId: this.orderLocalStore.order.id, cloneOrder: true }])
      });
    ;
  }*/

}
