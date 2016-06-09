/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {Config} from "../../../config/config";
import {HttpClient} from "../../share/components/interceptor"

@Injectable()
export class SharedServices {
  constructor(private http: Http,
              private httpClient: HttpClient){
              this.httpClient=httpClient;
  }

  public getAllUsers(){
    let url = Config.RESTServer + `user`;
    return this.httpClient.get(url).map((res) => res.json());
  }

  public getUserById(value){
/*    let url = Config.RESTServer + `orders?_id=` + value;
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
          defaultTask.assignedOn = new Date(item[0].defaultTask.assignedOn);
          defaultTask.assignedTo = item[0].defaultTask.assignedTo;
          defaultTask.status = item[0].defaultTask.status;
          defaultTask.completeBy = new Date(item[0].defaultTask.completeBy);
          defaultTask.priority = item[0].defaultTask.priority;

          //var order = new Order();
          order.id = item[0]._id;
          order.remarks = item[0].remarks;
          order.contactPerson = item[0].contactPerson;
          order.shippingAddress = item[0].shippingAddress;
          order.billingAddress = item[0].billingAddress;
          order.items = item[0].items;
          order.contactNumber = item[0].contactNumber;
          order.orderDate = new Date(item[0].orderDate);
          order.completionDate = new Date(item[0].completionDate);
          order.fromCompany = item[0].fromCompany;
          order.defaultTask = defaultTask;

          //result.push(order);
        }
        return order;
      });*/
  }

  createUser(value){
    let params = JSON.stringify(value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `user`;
    return this.http.post(url, params,options);
  }
  public userLogin(value){
    let params = JSON.stringify(value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `user/login`;
    return this.http.post(url, params,options);
  }

}
