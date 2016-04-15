import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class SearchService {

  // Observable string sources
  private _applySearchSource = new Subject<string>();

  // Observable string streams
  applySearch$ = this._applySearchSource.asObservable();

  // Service message commands
  applyFilter(search: string) {
    this._applySearchSource.next(search)
  }
}
