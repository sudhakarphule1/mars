/**
 * Created by chetan on 13/4/16.
 */
import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import order =  require("../classes/OrderModel");
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams} from 'angular2/router';

import IItem = require("../classes/Item");
import IAddress = require("../classes/Address");

@Component({
  selector: 'ib-preview-order',
  templateUrl: 'app/order/components/preview-order.component.html',
  styleUrls: ['app/order/components/preview-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
})

export class PreviewOrder {
  currentOrder: order = new order();
  id: string;
  constructor(private orders: Orders, params: RouteParams)
  {
    this.id = params.get('orderId');
    orders.getOrder(this.id).subscribe(res => {
      this.currentOrder = res;
    });
  }

  editOrder(){

  }
}
