import {Component, OnInit} from '@angular/core';
import {Route, ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {FORM_DIRECTIVES} from "@angular/common";
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {HTTP_PROVIDERS} from '@angular/http';
import {Orders} from '../services/order.service';
import {Order} from "../../model/order";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {OrderLocalStore} from "./order-local-store";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";
import {OrderHeader} from "./order-header.component";
import {AddOtherDetails} from "./add-other-details.component";
import {AddItems} from "./add-items.component";
import {CustomerServices} from "../services/customer.service";

@Component({
  selector: 'create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styles: [ require('./common.scss') ],
  providers: [],
  directives: [OrderHeader, AddOtherDetails, AddItems],
})

export class CreateOrder{

  leadId: string;

  constructor(params: RouteParams) {
    this.leadId = params.get('orderId');
  }

}
