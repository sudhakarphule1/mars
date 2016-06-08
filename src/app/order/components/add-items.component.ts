import {Component, Input} from 'angular2/core';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {SearchService}     from '../../share/components/search.service';
import {ProductsFilterPipe} from "./products-filter.pipe"
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {OrderLocalStore} from "./order-local-store";
import {Subscription} from "rxjs/Subscription";
import {OrderObservableService} from "../services/order.observable.service";
import {CustomerObservableService} from "../services/customer.observable.service";

@Component({
  selector: 'oa-order-items',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes:[ProductsFilterPipe]
})

export class AddItems {

  items : Array<Item> = new Array<Item>();
  copyItems : Array<Item> = new Array<Item>();
  displayError = false;
  showProducts: boolean = false;
  search: string = '';
  message: string = '';
  search: string;
  isVisibleProductArray : Array<Boolean> =new Array<Boolean>();
  displayMessage: boolean = false;
  subscription: Subscription;
  totalAmount: number = 0;
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
      });

    this.subscription = orderObservableService.filterOrders$.subscribe(
      orderObject=>{
        this.currentOrder = orderObject;
        console.log(this.currentOrder.items);
      }
    )
  }

  saveItems(){

    this.displayMessage = false;
    for (var i = 0; i < this.currentOrder.items.length; i++)
    {
      if(this.currentOrder.items[i].qty === 0){
        this.message = "The quantity for one of your selected products is 0.";
        this.displayMessage = true;
        break;
      }
    }
    if(this.displayMessage === false){
      this.currentOrder.items = this.currentOrder.items;
      this.currentOrder.totalAmount = this.totalAmount;
      this.message = "Your items list has been successfully saved.";
      this.displayMessage = true;
    }

  }

  makeProductSuggestionVisible(item){
    this.isVisibleProductArray[item] = true;
    for(var index : number = 0; index < this.currentOrder.items.length;index++){
      if(index != item){
        this.isVisibleProductArray[index] = false;
      }
    }
  }

  selectThisItem(value){

    value.qty = 1;
    value.amount=value.unitRate*value.qty;
    this.currentOrder.items.push(value);
    this.getTotalAmount();

    var index = this.items.indexOf(value);
    if(index > -1){
      this.items.splice(index, 1);
    }
    this.showProducts = false;
    this.search = '';

  }

  selectItemFromFiltered(oldItem,newItem){
    var index : number = this.currentOrder.items.indexOf(oldItem);
    this.currentOrder.items[this.currentOrder.items.indexOf(oldItem)]=newItem;
    this.isVisibleProductArray[index] = false;
  }

  getTotalAmount(){

    this.totalAmount = 0;
    for(var i = 0; i < this.currentOrder.items.length; i++){
      this.totalAmount += this.currentOrder.items[i].amount;
    }
  }

  removeSelectedItem(value){
    var index = this.currentOrder.items.indexOf(value);
    if(index > -1){
      this.currentOrder.items.splice(index, 1);
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
