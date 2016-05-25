/**
 * Created by chetan on 19/5/16.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/http";
import {RequestOptions} from "angular2/http";
import {Order} from "../../model/order";
import {Task} from "../../model/task";
import {Customer} from "../../model/customer";

@Injectable()
export class CustomerServices {
  constructor(private http: Http){}

  public getAllCustomers(){
    let url = `http://localhost:5000/customer?access_token=`+localStorage.getItem("access_token");
    return this.http.get(url).map((res) => res.json());
  }

  public createCustomer(value){
    value.access_token = localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    console.log("create customer params =>"+params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/customer`;
    return this.http.post(url, params,options);
  }

/*  public getLastOrder(value1, value2){
    let url = `http://localhost:5000/orders?fromCompany=` + value2 + `&sendLastOrder=true`  + `&access_token=`+ localStorage.getItem("access_token");
    return this.http.get(url).map((res) => res.json());
  }

  public getAllOrders(){
    let url = `http://localhost:5000/orders?access_token=`+ localStorage.getItem("access_token");
    return this.getOrdersObjectFunction(url);
  }

  public getOrdersByStatus(value){
    let url = `http://localhost:5000/orders?defaultTask.status=` + value + `&access_token=`+ localStorage.getItem("access_token");
    return this.getOrdersObjectFunction(url);
  }

  public getOrderById(value){
    let url = `http://localhost:5000/orders?_id=` + value  + `&access_token=`+ localStorage.getItem("access_token");
    /!*return this.getOrdersObjectFunction(url);*!/
    return this.http.get(url)
      // initial transform - result to json
      .map(res => res.json())
      // next transform - each element in the
      // array to a Typed class instance
      .map((item: Array<any>) => {
        let order:Order = new Order();
        let result:Array<Order> = [];
        if (item)
        {
          var defaultTask : Task = new Task();
          defaultTask.assignedOn = new Date(item.result[0].defaultTask.assignedOn);
          defaultTask.assignedTo = item.result[0].defaultTask.assignedTo;
          defaultTask.status = item.result[0].defaultTask.status;
          defaultTask.completeBy = new Date(item.result[0].defaultTask.completeBy);
          defaultTask.priority = item.result[0].defaultTask.priority;

          //var order = new Order();
          order.id = item.result[0]._id;
          order.remarks = item.result[0].remarks;
          order.contactPerson = item.result[0].contactPerson;
          order.shippingAddress = item.result[0].shippingAddress;
          order.billingAddress = item.result[0].billingAddress;
          order.items = item.result[0].items;
          order.contactNumber = item.result[0].contactNumber;
          order.orderDate = new Date(item.result[0].orderDate);
          order.completionDate = new Date(item.result[0].completionDate);
          order.fromCompany = item.result[0].fromCompany;
          order.defaultTask = defaultTask;

          //result.push(order);
        }
        return order;
      });
  }

  public createOrder(value){
    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders`;
    return this.http.post(url, params,options);
  }

  public editOrder(value){
    let params = JSON.stringify(value);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = `http://localhost:5000/orders?_id=` + value.id;
    return this.http.put(url, params,options).map((res) => res.json());
  }

  public deleteOrder(value: Array<any>){
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
          arrayList.result.forEach((item) => {
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
  }*/

}