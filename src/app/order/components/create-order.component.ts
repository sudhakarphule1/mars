/**
 * Created by chetan on 27/4/16.
 */
import {Component} from 'angular2/core';
import {Route, RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import {FORM_DIRECTIVES} from "angular2/common";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {Task} from "../../model/task";
import {Address} from "../../model/address";

import {AddItems} from "./add-items.component";
import {PreviewItems} from "./preview-items.component";
import {AddOtherDetails} from "./add-other-details.component";
import {PreviewOrder} from "./preview-order.component";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, MyDatePicker],
})
@RouteConfig([
   new Route({ path: '/addItems', component: AddItems, name: 'AddItems', useAsDefault: true}),
   new Route({ path: '/previewItems', component: PreviewItems, name: 'PreviewItems'}),
   new Route({ path: '/addOtherDetails', component: AddOtherDetails, name: 'AddOtherDetails'}),
   new Route({ path: '/previewOrder', component: PreviewOrder, name: 'PreviewOrder'})
])

export class CreateOrder {

  private myDatePickerOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px'
  };

  selectedDate: string = '20.12.2015';

  leadId: string;
  task: Task;
  orderStage: string = "createOrder";

  currentOrder: Order = new Order();

  constructor(params: RouteParams) {
    this.leadId = params.get('leadId');
    this.task = new Task();
    this.task.assignedTo = "Swapnil";
    this.task.priority = "High";
    this.currentOrder.defaultTask = this.task;
  }

  onDateChanged(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }
}
