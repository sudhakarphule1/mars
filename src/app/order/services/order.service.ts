/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";
import {Order} from "../../model/order";
import {Task} from "../../model/task";

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
            var defaultTask : Task = new Task();
            defaultTask.assignedOn = new Date(item.task.assignedOn);
            defaultTask.assignedTo = item.task.assignedTo;
            defaultTask.status = item.task.status;
            defaultTask.completeBy = new Date(item.task.completeBy);
            defaultTask.priority = item.task.priority;

            var order = new Order();
            order.id = item.id;
            order.orderDetails = item.items;
            order.orderDate = new Date(item.orderDate);
            order.completionDate = new Date(item.completionDate);
            order.fromCompany = item.companyName;
            order.defaultTask = defaultTask;

            result.push(order);
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
    /*return this.http.get(url).map((res) => res.json());*/
    return this.http.get(url)
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((item: any) => {
        let order:Order = new Order();
        if (item) {
          var defaultTask : Task = new Task();
          defaultTask.assignedOn = new Date(item.task.assignedOn);
          defaultTask.assignedTo = item.task.assignedTo;
          defaultTask.status = item.task.status;
          defaultTask.completeBy = new Date(item.task.completeBy);
          defaultTask.priority = item.task.priority;

          //var order = new Order();
          order.id = item._id;
          order.remarks = item.remarks;
          order.contactPerson = item.contactPerson;
          order.vendorName = item.vendorName;
          order.shippingAddress = item.shippingAddress;
          order.billingAddress = item.billingAddress;
          order.orderDetails = item.items;
          order.contactNumber = item.contactNumber;
          order.orderDate = new Date(item.orderDate);
          order.completionDate = new Date(item.completionDate);
          order.fromCompany = item.companyName;
          order.defaultTask = defaultTask;

          //result.push(order);
        }
        return order;
      });
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
