/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Order} from "../../inbox/inbox.model";
import {Task} from "../classes/Task";
import OrderModel = require("../components/order.model");
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";

@Injectable()
export class Orders {
  constructor(private http: Http){}

  getAllProducts(){
    return this.getAllProductsFunction();
  }

  getAllOrders(){
    return this.getAllProductsFunction();
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
    //let url = `http://localhost:5000/orders`;
      return this.http.get(url).map((res) => res.json());
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
