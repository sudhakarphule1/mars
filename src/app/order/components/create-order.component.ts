import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
//import 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders]
})

export class CreateOrder {

  myOrders : Observable<any>;
  //allOrders;
  constructor(private orders: Orders) {

    this.myOrders = orders.getOrders();
  }
}

