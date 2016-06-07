
import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessageService {

  // Observable string sources
  private _showMessageSource = new Subject<string>();

  // Observable string streams
  showMessage$ = this._showMessageSource.asObservable();

  // Service message commands
  show(message: string) {
    this._showMessageSource.next(message)
  }
}
