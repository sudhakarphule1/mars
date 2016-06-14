/**
 * Created by amitg on 13/6/16.
 */

import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CommonObservableService {

  // Observable string sources
  private _showCustomerSource = new Subject<boolean>();

  // Observable string streams
  showCustomer$ = this._showCustomerSource.asObservable();

  // Service message commands
  change(isCustomerSelected: boolean) {
    this._showCustomerSource.next(isCustomerSelected);
  }



}
