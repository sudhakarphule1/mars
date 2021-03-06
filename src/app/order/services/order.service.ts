/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";
import {Order} from "../../model/order";
import * as task from "../../model/task";
import {Config} from "../../../config/config";
import {HttpClient} from "../../share/components/interceptor"

@Injectable()
export class Orders {
  constructor(private http: Http,
              private httpClient: HttpClient){
    this.httpClient = httpClient;
  }

  public getAllProducts(){
    let url = Config.RESTServer + `product`;
    return this.httpClient.get(url).map((res) => res.json()).map((data) => {
      localStorage.setItem("access_token", data.access_token);
      let result:Array<Order> = [];
      if (data.result) {
        data.result.forEach((item) => {
          item.qty = 0;
          result.push(item);
        });
      }
      return result;});
  }

  public getLastOrder(value1, value2){
    let url = Config.RESTServer + `orders?fromCompany=` + value2 + `&sendLastOrder=true`  + `&access_token=`+ localStorage.getItem("access_token");
    return this.http.get(url).map((res) => res.json());
  }

  public getAllOrders(){
    let url = Config.RESTServer + `orders?access_token=`+ localStorage.getItem("access_token");
    return this.getOrdersObjectFunction(url);
  }

  public getOrdersByStatus(value){
    let url = Config.RESTServer + `orders?defaultTask.status=` + value + `&access_token=`+ localStorage.getItem("access_token");
    return this.getOrdersObjectFunction(url);
  }

  public getOrderById(value){
    let url = Config.RESTServer + `orders?_id=` + value  + `&access_token=`+ localStorage.getItem("access_token");
    /*return this.getOrdersObjectFunction(url);*/
    return this.http.get(url)
    // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((item: any) => {
        let order:Order = new Order();
        if (item)
        {
          var defaultTask : task.Task = new task.Task();
          defaultTask.assignedOn = new Date(item.result[0].defaultTask.assignedOn);
          defaultTask.assignedTo = item.result[0].defaultTask.assignedTo;
          defaultTask.status = item.result[0].defaultTask.status;
          defaultTask.completeBy = new Date(item.result[0].defaultTask.completeBy);
          defaultTask.priority = item.result[0].defaultTask.priority;

          //var order = new Order();
          order._id = item.result[0]._id;
          order.remarks = item.result[0].remarks;
          order.shippingAddress = item.result[0].shippingAddress;
          order.billingAddress = item.result[0].billingAddress;
          order.items = item.result[0].items;
          order.customer = item.result[0].customer;
          order.orderDate = new Date(item.result[0].orderDate);
          order.completionDate = new Date(item.result[0].completionDate);
          order.defaultTask = defaultTask;
        }
        return order;
      });
  }

  public createOrder(value){
    value.access_token = localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    console.log("create order params =>"+params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `orders`;
    return this.http.post(url, params,options);
  }

  public editOrder(value){
    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `orders?_id=` + value.id;
    return this.http.put(url, params,options).map((res) => res.json());
  }

  public deleteOrder(value: Array<any>){
    let url = Config.RESTServer + `orders`;
    return this.http.delete(url).map((res) => res.json());
  }

  public getOrdersObjectFunction(url){
    return this.http.get(url)
    // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((arrayList: any) => {
        let result:Array<Order> = [];
        if (arrayList) {
          arrayList.result.forEach((item: any) => {
            var defaultTask : task.Task = new task.Task();
            defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
            defaultTask.assignedTo = item.defaultTask.assignedTo;
            defaultTask.status = item.defaultTask.status;
            defaultTask.completeBy = new Date(item.defaultTask.completeBy);
            defaultTask.priority = item.defaultTask.priority;

            var order = new Order();
            order._id = item._id;
            order.items = item.items;
            order.orderDate = new Date(item.orderDate);
            order.completionDate = new Date(item.completionDate);
            order.fromCompany = item.fromCompany;
            order.defaultTask = defaultTask;
            order.remarks = item.remarks;
            order.shippingAddress = item.shippingAddress;
            order.billingAddress = item.billingAddress;
            order.customer = item.customer;

            result.push(order);
          });
        }
        return result;
      });
  }

}
