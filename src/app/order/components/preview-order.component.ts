/**
 * Created by chetan on 13/4/16.
 */
import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES, MdDialog} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/components/dialog/dialog";
import {Media} from "ng2-material/core/util/media";
import order =  require("../classes/OrderModel");
import {FORM_DIRECTIVES} from "angular2/common";

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

  items : Array<IItem>;
  orderDetails: Array<IItem> = new Array();
  orderStage: string = "createOrder";
  displayError = false;
  displaySuccess = false;
  errorMessage: string = "";
  successMessage: string = "";
  orderID: string;

  currentOrder: order = new order();


  editOrder(){

  }
}
