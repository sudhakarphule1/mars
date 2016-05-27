import {Component, Input, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Order} from "../../model/order";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";

@Component({
  selector: 'or-order-header',
  templateUrl: 'app/order/components/order-header.component.html',
  styles: [ require('./common.scss') ],
  providers: [HTTP_PROVIDERS, Orders, SharedServices],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, MyDatePicker],
})

export class OrderHeader implements OnInit{

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
  @Input() currentOrder: Order;
  message: string = "";
  orderState: string = "orderPreview";
  displayMessage: boolean = false;
  id: string;
  allUsers: Array<User>;
  constructor(private orders: Orders,
              params: RouteParams,
              private sharedServices: SharedServices) {
    this.id = params.get('orderId');
    console.log("header order" + this.currentOrder);
  }

  ngOnInit() {
    this.sharedServices.getAllUsers().subscribe(res => this.allUsers = res.result);
  }

  editOrder(){
    this.orders.editOrder(this.currentOrder).subscribe(
      err => this.message = "Your order details have been successfully updated.",
      () => this.message = "Your order details have been successfully updated."
    );
    this.displayMessage = true;
  }

  removeItem(item){
    var index = this.currentOrder.items.indexOf(item);
    this.currentOrder.items.splice(index, 1);
    if(this.currentOrder.items.length == 0){
      this.orderState = "orderPreview";
    }
  }

  onDate1Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.assignedOn = new Date(event.formatted);
    console.log("assigned on:" + this.currentOrder.defaultTask.assignedOn);
  }

  onDate2Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.completeBy = new Date(event.formatted);
    console.log(" complete by:" + this.currentOrder.defaultTask.completeBy);
  }

  onChange(value){
    for(var i in this.allUsers){
      if (this.allUsers[i].firstName === this.currentOrder.defaultTask.assignedTo.firstName){
        this.currentOrder.defaultTask.assignedTo = Object.assign({}, this.allUsers[i]);
      };
    }
  }

}
