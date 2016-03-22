import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {DataProvider}   from "./data-provider";
import {Order}          from "../inbox.model";
import {Observable}     from 'rxjs/Observable';
import {Task} from "../inbox.model";

@Injectable()
export class OrdersDataProvider implements DataProvider {
  constructor (private http: Http) {}

  private _url = '/app/inbox/data-providers/orders-mock.json';  // URL to web api

  getAll() {
    return this.http.get(this._url)
      // initial transform - result to json
      .map(res => res.json().data)
      // next transform - each element in the
      // array to a Typed class instance
      .map((arrayList: Array<any>) => {
        let result:Array<Order> = [];
        if (arrayList) {
          arrayList.forEach((item) => {
            var defaultTask : Task = new Task(item.defaultTask.assignedOn, item.defaultTask.assignedTo,
              item.defaultTask.status, item.defaultTask.completeBy, item.defaultTask.priority);
            var email = new Order(  item.id, item.companyName, new Date(item.orderDate),
                                    new Date(item.completionDate), item.status,
                                    item.orderType, item.orderDetails, item.fromCompany, defaultTask);
            result.push(email);
          });
        }
        return result;
      });
  }
}
