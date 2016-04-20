import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Order}          from "../inbox.model";
import {Observable}     from 'rxjs/Observable';
import {Task} from "../inbox.model";

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
}
