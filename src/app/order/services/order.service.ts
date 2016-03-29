/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

import OrderModel = require("../components/order.model");
import {Headers} from "angular2/http";

@Injectable()
export class Orders {
  constructor(private http: Http){}

  getOrders(){
    return this.getOrdersFunction();
  }

  createOrder(value){
  return this.createOrderFunction(value);
  }

  deleteOrder(value: Array<any>){
  return this.deleteOrderFunction(value);
  }

  public getOrdersFunction(){
      let url = `app/order/services/myOrders.json`;
      return this.http.get(url).map((res) => res.json())
/*      .map((orders: Array<any>) => {
      let result:Array<any> = [];
      if (orders) {
        orders.forEach((order) => {
          result.push(new orders(order.productName, task.description,
                                task.dueDate, task.complete));
        });
      }
      return result;
     }
  });*/
  }
  /*let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:3001/sessions/create', creds, {
  headers: headers
})
.subscribe(
  data => {
    this.saveJwt(data.json().id_token);
    username.value = null;
    password.value = null;
  },
  err => this.logError(err.json().message),
  () => console.log('Authentication Complete')
);*/
  public createOrderFunction(value){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
      let url = `http://localhost:5000/orders`;
      return this.http.post(url, value, headers);
  }

  public deleteOrderFunction(value){
      let url = `app/order/services/myOrders.json`;
      return this.http.get(url).map((res) => res.json());
  }

}
