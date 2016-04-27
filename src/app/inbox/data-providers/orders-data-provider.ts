import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Order} from "../../model/order";
import {Task} from "../../model/task";

@Injectable()
export class OrdersDataProvider implements DataProvider {
  constructor (private http: Http) {}

  private _url = 'http://localhost:5000/orders';  // URL to web api

  getAll() {
    return this.http.get(this._url)
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

            result.push(order);
          });
        }
        return result;
      });
  }
}
