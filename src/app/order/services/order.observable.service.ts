/**
 * Created by chetan on 3/6/16.
 */
import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";
import {Order} from "../../model/order";

@Injectable()
export class OrderObservableService {

  // Observable string sources
  private _showOrderSource = new Subject<Order>();

  // Observable string streams
  filterOrders$ = this._showOrderSource.asObservable();

  // Service message commands
  changeOrderObject(orderObject: Order) {
    this._showOrderSource.next(orderObject);
  }
}
