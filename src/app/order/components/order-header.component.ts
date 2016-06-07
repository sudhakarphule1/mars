import {Component, Input, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Order} from "../../model/order";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";
import {CustomerServices} from "../services/customer.service";
import {Customer} from "../../model/customer";
import {CustomerObservableService} from "../services/customer.observable.service";
import {OrderObservableService} from "../services/order.observable.service";

@Component({
  selector: 'order-header',
  templateUrl: 'app/order/components/order-header.component.html',
  styles: [ require('./common.scss') ],
  providers: [HTTP_PROVIDERS, SharedServices, CustomerServices],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, MyDatePicker],
})

export class OrderHeader implements OnInit{

  private myDatePickerOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '17px',
    width: '150px'
  };

  orderDate: string = '2016-04-01';
  orderPlacedDate: string = '2016-04-01';
  transitDate: string = '2016-04-01';
  completionDate: string = '2016-04-01';
  currentOrder: Order = new Order();
  private allCustomers: Array<Customer>;
  private selectedCustomer: Customer = new Customer();
  private newCustomer : Customer =new Customer();
  leadId: string;
  displayMessage: boolean = false;
  id: string;
  private response;
  allUsers: Array<User>;
  constructor(params: RouteParams,
              private sharedServices: SharedServices,
              private customerServices: CustomerServices,
              private customerObservableService :CustomerObservableService,
              private orderObservableService: OrderObservableService) {
    this.leadId = params.get('orderId');
    this.currentOrder.orderDate = new Date(this.orderDate);
    this.currentOrder.completionDate = new Date(this.completionDate);
    this.currentOrder.orderPlacedDate = new Date(this.orderPlacedDate);
    this.currentOrder.transitDate = new Date(this.transitDate);
  }

  ngOnInit() {
    this.sharedServices.getAllUsers()
      .subscribe(res => {this.allUsers = res.result;
      });
    this.customerServices.getAllCustomers().subscribe(res => {this.allCustomers = res.result;});
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

  getUserDetails(user){
    for(var i in this.allUsers){
      if (this.allUsers[i]._id === user){
        this.currentOrder.defaultTask.assignedTo = this.allUsers[i];
        this.orderObservableService.changeOrderObject(this.currentOrder);
      }
    }
  }

  getCustomerDetails(customerId){
   for (var i = 0; i < this.allCustomers.length; i++)
    {
      if (this.allCustomers[i]._id == customerId) {
        this.selectedCustomer = this.allCustomers[i];
        this.currentOrder.customer = this.selectedCustomer;
        this.currentOrder.fromCompany = this.selectedCustomer.fromCompany;
        this.currentOrder.billingAddress = this.selectedCustomer.billingAddress;
        this.currentOrder.shippingAddress = this.selectedCustomer.shippingAddress;
        this.orderObservableService.changeOrderObject(this.currentOrder);
        break;
        /*this.customerObservableService.changeCustomerObject(this.currentCustomer);*/
      }
    }
  }

  createCustomer(){

    if (!this.newCustomer.fromCompany || !this.newCustomer.contactPerson ||
      !this.newCustomer.contactNumber || !this.newCustomer.shippingAddress.line1 ||
      !this.newCustomer.shippingAddress.line2 || !this.newCustomer.shippingAddress.pinCode ||
      !this.newCustomer.shippingAddress.city || !this.newCustomer.billingAddress.line1 ||
      !this.newCustomer.billingAddress.line2 || !this.newCustomer.billingAddress.pinCode ||
      !this.newCustomer.billingAddress.city ) {
      console.log("Some validation error are remaining");
    }
    else {
      this.currentOrder.fromCompany = this.newCustomer.fromCompany;
      this.currentOrder.billingAddress = this.newCustomer.billingAddress;
      this.currentOrder.shippingAddress = this.newCustomer.shippingAddress;
      this.customerServices.createCustomer(this.newCustomer).subscribe
      (res =>
      {this.response = res.json();
        this.currentOrder.customer = this.response.result._id;
      });
    }
  }
  copyAddress(){
    this.newCustomer.billingAddress.line1 = this.newCustomer.shippingAddress.line1;
    this.newCustomer.billingAddress.line2 = this.newCustomer.shippingAddress.line2;
    this.newCustomer.billingAddress.pinCode = this.newCustomer.shippingAddress.pinCode;
    this.newCustomer.billingAddress.city = this.newCustomer.shippingAddress.city;
    this.newCustomer.billingAddress.state = this.newCustomer.shippingAddress.state;
    this.newCustomer.billingAddress.country = this.newCustomer.shippingAddress.country;
  }

}
