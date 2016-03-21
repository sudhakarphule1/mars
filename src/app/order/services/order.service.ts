/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Orders {
  constructor(private http: Http){}

  getOrders(){
    return this.getOrdersFunction();
  }

  createOrder(value: Array<any>){
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

  public createOrderFunction(value){
      let url = `app/order/services/myOrders.json`;
      return this.http.post(url, value).map((res) => res.json());
  }

  public deleteOrderFunction(value){
      let url = `app/order/services/myOrders.json`;
      return this.http.get(url).map((res) => res.json());
  }

}
