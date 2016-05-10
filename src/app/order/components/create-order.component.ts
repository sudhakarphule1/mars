import {Component, OnInit} from 'angular2/core';
import {Route, RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import {FORM_DIRECTIVES} from "angular2/common";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {Order} from "../../model/order";

import {AddItems} from "./add-items.component";
import {PreviewItems} from "./preview-items.component";
import {AddOtherDetails} from "./add-other-details.component";
import {PreviewOrder} from "./preview-order.component";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {OrderLocalStore} from "./order-local-store";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";

@Component({
  selector: 'ib-create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styleUrls: ['app/order/components/create-order.component.css'],
  providers: [HTTP_PROVIDERS, Orders, SharedServices],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, MyDatePicker],
})
@RouteConfig([
  new Route({ path: '/addItems', component: AddItems, name: 'AddItems', useAsDefault: true}),
  new Route({ path: '/previewItems', component: PreviewItems, name: 'PreviewItems'}),
  new Route({ path: '/addOtherDetails', component: AddOtherDetails, name: 'AddOtherDetails'}),
  new Route({ path: '/previewOrder', component: PreviewOrder, name: 'PreviewOrder'})
])

export class CreateOrder implements OnInit{

  private myDatePickerOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '20px',
    width: '150px'
  };

  selectedDate1: string = '2016-04-01';
  selectedDate2: string = '2016-04-01';
  leadId: string;
  allUsers: Array<User>;
  currentOrder: Order = new Order();

  constructor(params: RouteParams,
              private orderLocalStore : OrderLocalStore,
              private sharedServices: SharedServices) {
    this.leadId = params.get('leadId');
    this.currentOrder.defaultTask.priority = "High";
    orderLocalStore.order = this.currentOrder;
    this.currentOrder.defaultTask.assignedTo.firstName = "Swapnil";
  }

  ngOnInit() {
    this.sharedServices.getAllUsers().subscribe(res => this.allUsers = res);
  }

  onDate1Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.assignedOn = new Date(event.formatted);
    console.log("assigned on:" + this.currentOrder.defaultTask.assignedOn);
  }

  onChange(value){
    for(var i in this.allUsers){
        if (this.allUsers[i]._id === this.currentOrder.defaultTask.assignedTo._id){
          this.currentOrder.defaultTask.assignedTo = this.allUsers[i];
        };
    }
    console.log(this.currentOrder.defaultTask.assignedTo);
  }

  onDate2Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.completeBy = new Date(event.formatted);
    console.log(" complete by:" + this.currentOrder.defaultTask.completeBy);
  }
}
