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

  public getAllProducts(){
    let url = `app/order/services/myProducts.json`;
    return this.http.get(url).map((res) => res.json());
  }

  public getAllOrders(){
    let url = `http://localhost:5000/orders`;
    return this.getOrdersObjectFunction(url);
  }

  public getOrdersByStatus(value){
    let url = `http://localhost:5000/orders?defaultTask.status=` + value;
    return this.getOrdersObjectFunction(url);
  }

  public getOrderById(value){
    let url = `http://localhost:5000/orders?_id=` + value;
    /*return this.getOrdersObjectFunction(url);*/
    return this.http.get(url)
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((item: any) => {
        let order:Order = new Order();
        if (item) {
          var defaultTask : Task = new Task();
          defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
          defaultTask.assignedTo = item.defaultTask.assignedTo;
          defaultTask.status = item.defaultTask.status;
          defaultTask.completeBy = new Date(item.defaultTask.completeBy);
          defaultTask.priority = item.defaultTask.priority;

          //var order = new Order();
          order.id = item._id;
          order.remarks = item.remarks;
          order.contactPerson = item.contactPerson;
          order.shippingAddress = item.shippingAddress;
          order.billingAddress = item.billingAddress;
          order.items = item.items;
          order.contactNumber = item.contactNumber;
          order.orderDate = new Date(item.orderDate);
          order.completionDate = new Date(item.completionDate);
          order.fromCompany = item.fromCompany;
          order.defaultTask = defaultTask;

          //result.push(order);
        }
        return order;
      });
  }

  createOrder(value){
    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders`;
    return this.http.post(url, params,options);
  }

  editOrder(value){
    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders/` + value.id;
    return this.http.put(url, params,options).map((res) => res.json());
  }

  deleteOrder(value: Array<any>){
    let url = `app/order/services/myOrders.json`;
    return this.http.get(url).map((res) => res.json());
  }

  public getOrdersObjectFunction(url){
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
            defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
            defaultTask.assignedTo = item.defaultTask.assignedTo;
            defaultTask.status = item.defaultTask.status;
            defaultTask.completeBy = new Date(item.defaultTask.completeBy);
            defaultTask.priority = item.defaultTask.priority;

            var order = new Order();
            order.id = item._id;
            order.items = item.items;
            order.orderDate = new Date(item.orderDate);
            order.completionDate = new Date(item.completionDate);
            order.fromCompany = item.fromCompany;
            order.defaultTask = defaultTask;
            order.remarks = item.remarks;
            order.contactPerson = item.contactPerson;
            order.shippingAddress = item.shippingAddress;
            order.billingAddress = item.billingAddress;
            order.contactNumber = item.contactNumber;

            result.push(order);
          });
        }
        return result;
      });
  }

  /*public getOrderFunction(value){
    let url = `http://localhost:5000/orders?_id=` + value;
    /!*return this.http.get(url).map((res) => res.json());*!/
    return this.http.get(url)
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((item: any) => {
        let order:Order = new Order();
        if (item) {
          var defaultTask : Task = new Task();
          defaultTask.assignedOn = new Date(item.defaultTask.assignedOn);
          defaultTask.assignedTo = item.defaultTask.assignedTo;
          defaultTask.status = item.defaultTask.status;
          defaultTask.completeBy = new Date(item.defaultTask.completeBy);
          defaultTask.priority = item.defaultTask.priority;

          //var order = new Order();
          order.id = item._id;
          order.remarks = item.remarks;
          order.contactPerson = item.contactPerson;
          order.shippingAddress = item.shippingAddress;
          order.billingAddress = item.billingAddress;
          order.items = item.items;
          order.contactNumber = item.contactNumber;
          order.orderDate = new Date(item.orderDate);
          order.completionDate = new Date(item.completionDate);
          order.fromCompany = item.fromCompany;
          order.defaultTask = defaultTask;

          //result.push(order);
        }
        return order;
      });
  }*/

/*
  public createOrderFunction(value){

    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders`;
    return this.http.post(url, params,options).map((res) => res.json());
  }*/
/*
  public editOrderFunction(value){

    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders/` + value.id;
    return this.http.put(url, params,options).map((res) => res.json());
  }*/
/*
  public deleteOrderFunction(value){
    let url = `app/order/services/myOrders.json`;
    return this.http.get(url).map((res) => res.json());
  }*/

}
