/**
 * Created by chetan on 13/4/16.
 */
import {Component, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {Order} from "../../model/order";
import {Task} from "../../model/task";

@Component({
  selector: 'ib-preview-order',
  templateUrl: 'app/order/components/preview-order.component.html',
  styleUrls: ['app/order/components/preview-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
})

export class PreviewOrder implements OnInit{
  currentOrder : Order;
  id: string;
 /* orders: Orders;*/
  constructor(private orders: Orders, params: RouteParams)
  {
    this.id = params.get('orderId');
    this.currentOrder = new Order();
  }

  ngOnInit() {
    this.orders.getOrder(this.id).subscribe(res => {
      this.currentOrder = res;
      console.log(this.currentOrder);
    });
  }

  editOrder(){

  }

}
