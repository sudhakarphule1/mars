import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
//import 'rxjs/operator/map';
import {Observable} from 'rxjs/Observable';
import {AllOrders} from '../../services/orders';

@Component({
  selector: 'order-entry',
  templateUrl: 'app/components/orderEntry/orderEntry.html',
  styleUrls: ['app/components/orderEntry/orderEntry.css'],
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

