import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Orders} from '../services/order.service';
import {Order} from "../../model/order";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {OrderLocalStore} from "./order-local-store";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";
import {OrderHeader} from "./order-header.component";
import {AddOtherDetails} from "./add-other-details.component";
import {AddItems} from "./add-items.component";

@Component({
  selector: 'create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styles: [ require('./common.scss') ],
  providers: [HTTP_PROVIDERS, Orders, SharedServices],
  directives: [MyDatePicker, OrderHeader, AddOtherDetails, AddItems],
})

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
    this.sharedServices.getAllUsers()
      .subscribe(res => {this.allUsers = res.result;
        for(var i in this.allUsers){
          if (this.currentOrder.defaultTask.assignedTo.firstName === this.allUsers[i].firstName){
            this.currentOrder.defaultTask.assignedTo = Object.assign({}, this.allUsers[i]);
          }
        }
    });
  }

}
