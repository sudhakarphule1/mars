/**
 * Created by chetan on 19/5/16.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";
import {RequestOptions} from "@angular/http";
import {Config} from "../../../config/config";

@Injectable()
export class CustomerServices {
  constructor(private http: Http){}

  public getAllCustomers(){
    let url = Config.RESTServer + `customer?access_token=`+localStorage.getItem("access_token");
    return this.http.get(url).map((res) => res.json());
  }

  public createCustomer(value){
    value.access_token = localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    console.log("create customer params =>"+params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = Config.RESTServer + `customer`;
    return this.http.post(url, params,options);
  }

}
