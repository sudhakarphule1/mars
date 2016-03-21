import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
//import 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';
import {IOrder} from './IOrder';


@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders]
})

export class CreateOrder {

   myOrders : IOrder[];
   orderDetails: IOrder[] = new Array();
   orderPreview = false;
   displayError = false;
   errorMessage: string = "";

    constructor(private orders: Orders) {
    orders.getOrders().subscribe(res => this.myOrders = res);
    }

  createOrder(){

    for(var i in this.myOrders){
      if (this.myOrders[i].quantity > 0 ){
        this.orderDetails.push(this.myOrders[i]);
      }
    }

    if (this.orderDetails.length == 0){
        this.errorMessage = "You haven't selected any item for your order";
        this.displayError = true;
    }
    else {
        this.orderPreview = true;
        this.displayError = false;
    }

  }

  removeItem(item){
      var index = this.orderDetails.indexOf(item);
      this.orderDetails.splice(index, 1);
      console.log(this.orderDetails);
  }
}

