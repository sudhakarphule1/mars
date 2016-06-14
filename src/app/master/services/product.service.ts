/**
 * Created by Twinprimelabs on 13/06/16.
 */

import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, RequestOptionsArgs} from "angular2/http";
import "rxjs/add/operator/map";
import {Config} from "../../../config/config";
import {Item} from "../../model/item";

@Injectable()
export class ProductService {
  constructor(private http:Http) {
  }

  public getAllProducts() {
    let url = Config.RESTServer + `product?access_token=` + localStorage.getItem("access_token");
    return this.http.get(url).map((res) => res.json()).map((data) => {
      localStorage.setItem("access_token", data.access_token);
      let result:Array<Item> = [];
      if (data.result) {
        data.result.forEach((item) => {
          result.push(item);
        });
      }
      return result;
    });
  }

  public updateProduct(value) {
    value.access_token = localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    console.log("param", params);
    let url = Config.RESTServer + `product/` + value._id;
    console.log("url =>"+ url);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, params, options).map((res) => res.json()).map((data) => {
      localStorage.setItem("access_token", data.access_token);
      let result:Array<Item> = [];
      if (data.result) {
        data.result.forEach((item) => {
          result.push(item);
        });
      }
      return result;
    });
  }

  public deleteProduct(value) {
    value.access_token = localStorage.getItem("access_token");
    let params = JSON.stringify(value);
    let url = Config.RESTServer + `product/`+ value._id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,body:params});
    return this.http.delete(url,options).map((res) => res);
  }
}
