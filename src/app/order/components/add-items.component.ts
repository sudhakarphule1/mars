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
  selector: 'add-items',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-items.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes:[ProductsFilterPipe]
})

export class AddItems {

  items : Array<Item>;
  displayError = false;
  showProducts: boolean = false;
  search: string = '';
  message: string = '';
  displaySuccess: boolean = false;
  errorMessage: string = "";
  subscription: Subscription;
  totalAmount: number = 0;
  selectedItems: Array<Item> = new Array<Item>();
  currentOrder: Order = new Order();

  constructor(private orders: Orders,
              private searchService: SearchService,
              public orderLocalStore : OrderLocalStore,
              private orderObservableService: OrderObservableService,
              private customerObservableService :CustomerObservableService) {
    /*this.leadId = params.get('leadId');*/
    orders.getAllProducts()
      .subscribe(res => {this.items = res;
        for(var i in this.items){
            this.items[i].amount = 0;
        }
      });

    this.subscription = orderObservableService.filterOrders$.subscribe(
      orderObject=>{
        this.currentOrder = orderObject;
      }
    )
  }

  createOrder(){
/*
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
    }*/
    this.currentOrder.items = this.selectedItems;
    console.log(this.currentOrder.items);
    this.message = "Your items list has been successfully saved."
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
