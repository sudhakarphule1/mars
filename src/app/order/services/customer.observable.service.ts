

import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";
import {Customer} from "../../model/customer";

@Injectable()
export class CustomerObservableService {

  // Observable string sources
  private _showCustomerSource = new Subject<Customer>();

  // Observable string streams
  filterCustomers$ = this._showCustomerSource.asObservable();

  // Service message commands
  changeCustomerObject(custmerObject: Customer) {
    this._showCustomerSource.next(custmerObject);
  }
}
