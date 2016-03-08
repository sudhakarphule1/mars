import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
//import 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import {AllOrders} from '../services/order.service';

@Component({
  selector: 'order-entry',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, AllOrders],
  directives: [],
  pipes: []
})

export class OrderEntry {

  myOrders : Observable<any>;
  //allOrders;
  constructor(private orders: AllOrders) {

    this.myOrders = orders.getOrders();
  }
}

