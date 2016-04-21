/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Order, Task} from "../../inbox/inbox.model";
import OrderModel = require("../components/order.model");
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";

@Injectable()
export class Orders {
  constructor(private http: Http){}

  getAllProducts(){
    return this.getAllProductsFunction();
  }

  public getOrder(id){
    return this.getOrderFunction(id);
  }

  createOrder(value){
    return this.createOrderFunction(value);
  }

  deleteOrder(value: Array<any>){
    return this.deleteOrderFunction(value);
  }

  public getAllOrdersFunction(){
    let url = `http://localhost:5000/orders`;
    return this.http.get(url)
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((arrayList: Array<any>) => {
        let result:Array<Order> = [];
        if (arrayList) {
          arrayList.forEach((item) => {
            var defaultTask : Task = new Task(new Date(item.task.assignedOn), item.task.assignedTo,
              item.task.status, new Date(item.task.completeBy), item.task.priority);
            var email = new Order(  item.id, new Date(item.orderDate),
              new Date(item.completionDate),
              item.items, item.companyName, defaultTask);
            result.push(email);
          });
        }
        return result;
      });
  }

  public getAllProductsFunction(){
    let url = `app/order/services/myOrders.json`;
    return this.http.get(url).map((res) => res.json());
  }

  public getOrderFunction(value){
    let url = `http://localhost:5000/orders/` + value;
    return this.http.get(url).map((res) => res.json());
  }

  public createOrderFunction(value){

    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders`;
    return this.http.post(url, params,options).map((res) => res.json());
  }

  public deleteOrderFunction(value){
    let url = `app/order/services/myOrders.json`;
    return this.http.get(url).map((res) => res.json());
  }

}
