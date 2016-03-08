/**
 * Created by chetan on 8/3/16.
 */
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AllOrders {
  constructor(private http: Http){}

  getOrders(){
    return this.makeRequest();
  }

  private makeRequest(){
/*    let params = new URLSearchParams();
    params.set('per_page', '100');*/
    let url = `app/order/services/myOrders.json`;
    console.log(url);
    return this.http.get(url).map((res) => res.json());
  }
}
