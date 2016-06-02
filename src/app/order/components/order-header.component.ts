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
import {CustomerServices} from "../services/customer.service";
import {Customer} from "../../model/customer";

@Component({
  selector: 'order-header',
  templateUrl: 'app/order/components/order-header.component.html',
  styles: [ require('./common.scss') ],
  providers: [HTTP_PROVIDERS, Orders, SharedServices, CustomerServices],
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

  orderDate: string = '2016-04-01';
  orderPlacedDate: string = '2016-04-01';
  transitDate: string = '2016-04-01';
  completionDate: string = '2016-04-01';
  currentOrder: Order = new Order();
  message: string = "";
  private allCustomers: Array<Customer>;
  private selectedCustomer: Customer = new Customer();
  displayMessage: boolean = false;
  leadId: string;
  allUsers: Array<User>;
  private showDetails: boolean = false;
  constructor(private orders: Orders,
              params: RouteParams,
              private sharedServices: SharedServices,
              private customerServices: CustomerServices) {
    this.leadId = params.get('orderId');
  }

  ngOnInit() {
    this.sharedServices.getAllUsers()
      .subscribe(res => {this.allUsers = res.result;
/*        for(var i in this.allUsers){
          if (this.currentOrder.defaultTask.assignedTo.firstName === this.allUsers[i].firstName){
            this.currentOrder.defaultTask.assignedTo = Object.assign({}, this.allUsers[i]);
          }
        }*/
      });
    this.customerServices.getAllCustomers().subscribe(res => {this.allCustomers = res.result;});
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
    }
  }

  onDate1Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.assignedOn = new Date(event.formatted);
    this.currentOrder.orderDate = new Date(event.formatted);
    console.log("assigned on:" + this.currentOrder.defaultTask.assignedOn);
  }

  onDate2Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.orderPlacedDate = new Date(event.formatted);
    console.log(" complete by:" + this.currentOrder.defaultTask.completeBy);
  }
  onDate3Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.transitDate = new Date(event.formatted);
    console.log("assigned on:" + this.currentOrder.defaultTask.assignedOn);
  }

  onDate4Changed(event) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.currentOrder.defaultTask.completeBy = new Date(event.formatted);
    this.currentOrder.completionDate = new Date(event.formatted);
    console.log(" complete by:" + this.currentOrder.defaultTask.completeBy);
  }

  onChange(user){
    for(var i in this.allUsers){
      if (this.allUsers[i].firstName === this.currentOrder.defaultTask.assignedTo.firstName){
        this.currentOrder.defaultTask.assignedTo = Object.assign({}, this.allUsers[i]);
      }
    }
  }

  getCustomerDetails(customer){
    for (var i = 0; i < this.allCustomers.length; i++)
    {
      if (this.allCustomers[i].fromCompany == customer) {
        this.selectedCustomer = this.allCustomers[i];
      }
    }
    this.currentOrder.customer = this.selectedCustomer;
    this.currentOrder.fromCompany = this.selectedCustomer.fromCompany;
    this.currentOrder.billingAddress = this.selectedCustomer.billingAddress;
    this.currentOrder.shippingAddress = this.selectedCustomer.shippingAddress;
    this.showDetails =  true;
  }

}
