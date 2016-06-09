import {Component, Input} from '@angular/core';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {SearchService}     from '../../share/components/search.service';
import {ProductsFilterPipe} from "./products-filter.pipe"

import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {Router} from "@angular/router-deprecated";
import {OrderLocalStore} from "./order-local-store";
import {Subscription} from "rxjs/Subscription";
import {OrderObservableService} from "../services/order.observable.service";
import {CustomerObservableService} from "../services/customer.observable.service";

@Component({
  selector: 'oa-order-items',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styles: [ require('./order.components.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes:[ProductsFilterPipe]
})

export class AddItems {

  items : Array<Item> = new Array<Item>();
  copyItems : Array<Item> = new Array<Item>();
  displayError = false;
  showProducts: boolean = false;
  showProductsInside: boolean = false;
  itemName: string;
  search: string = '';
  message: string = '';
  displayMessage: boolean = false;
  errorMessage: string = "";
  subscription: Subscription;
  totalAmount: number = 0;
  totalQuantity: number = 0;
  selectedItems: Array<Item> = new Array<Item>();
  currentOrder: Order = new Order();

  constructor(private orders: Orders,
              private searchService: SearchService,
              public orderLocalStore : OrderLocalStore,
              private orderObservableService: OrderObservableService,
              private customerObservableService :CustomerObservableService) {
    orders.getAllProducts()
      .subscribe(res => {this.items = res;
        for(var i in this.items){
            this.items[i].amount = 0;
        }
        Object.assign(this.copyItems,this.items);
        console.log("copy Items"+this.copyItems);
      });

    this.subscription = orderObservableService.filterOrders$.subscribe(
      orderObject=>{
        this.currentOrder = orderObject;
      }
    )
  }

  saveItems(){

    this.displayMessage = false;
    for (var i = 0; i < this.selectedItems.length; i++)
    {
      if(this.selectedItems[i].qty === 0){
        this.message = "The quantity for one of your selected products is 0.";
        this.displayMessage = true;
        break;
      }
    }
    if(this.displayMessage === false){
      this.currentOrder.items = this.selectedItems;
      this.currentOrder.totalAmount = this.totalAmount;
      console.log(this.currentOrder.items);
      this.message = "Your items list has been successfully saved.";
      this.displayMessage = true;
    }

  }

  selectThisItem(value){

    /*for (var i = 0; i < this.items.length; i++)
    {
      if (this.items[i]._id === value._id) {
        this.errorMessage = "You have already selected this product.";
        this.displayError = true;
      }
      else{
        {break;}
      }
    }*/
    this.selectedItems.push(value);

    var index = this.items.indexOf(value);
    if(index > -1){
      this.items.splice(index, 1);
    }
    console.log(this.items);
    this.showProducts = false;
  }

  getTotalAmount(){

    this.totalAmount = 0;
    for(var i = 0; i < this.selectedItems.length; i++){
      this.totalAmount += this.selectedItems[i].amount;
    }
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
