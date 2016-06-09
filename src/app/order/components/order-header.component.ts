import {Component, Input, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {FORM_DIRECTIVES} from "@angular/common";
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Order} from "../../model/order";
import {MyDatePicker} from "../../share/components/date-picker/mydatepicker";
import {SharedServices} from "../services/shared.service";
import {User} from "../../model/user";
import {CustomerServices} from "../services/customer.service";
import {Customer} from "../../model/customer";
import {CustomerObservableService} from "../services/customer.observable.service";
import {OrderObservableService} from "../services/order.observable.service";
import {Orders} from "../services/order.service";
import {Address} from "../../model/address";

@Component({
  selector: 'oa-order-header',
  templateUrl: 'app/order/components/order-header.component.html',
  styles: [require('./order.components.scss')],
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
  /*selectedCustomerObject: Customer = new Customer();*/
  orderDate: string = '2016-04-01';
  orderPlacedDate: string = '2016-04-01';
  transitDate: string = '2016-04-01';
  completionDate: string = '2016-04-01';
  private  currentOrder: Order = new Order();
  private allCustomers: Array<Customer>;
  private selectedCustomer: Customer = new Customer();
  private newCustomer : Customer =new Customer();
  private tempAddress: Address;
  leadId: string;
  isNewCustomerDivInvisible : boolean = true;
  displayMessage: boolean = false;
  id: string;
  private response;
  allUsers: Array<User>;
  constructor(params: RouteParams,
              private orders: Orders,
              private sharedServices: SharedServices,
              private customerServices: CustomerServices,
              private customerObservableService :CustomerObservableService,
              private orderObservableService: OrderObservableService) {
    this.leadId = params.get('orderId');
    this.tempAddress =new Address();
    this.newCustomer.shippingAddress.push(this.tempAddress);
    this.newCustomer.billingAddress.push(this.tempAddress);
    if(this.leadId){
      this.orders.getOrderById(this.leadId).subscribe(res => {
        this.currentOrder = res;
        for(var i =0; i<this.currentOrder.items.length; i++){
          this.currentOrder.items[i].productId.qty = this.currentOrder.items[i].qty;
          this.currentOrder.items[i] = this.currentOrder.items[i].productId;
        }
        this.orderObservableService.changeOrderObject(this.currentOrder);
        this.selectedCustomer = this.currentOrder.customer;
/*        this.orderDate = toString(this.currentOrder.orderDate);
        this.completionDate = toString(this.currentOrder.completionDate);
        this.orderPlacedDate = toString(this.currentOrder.orderPlacedDate);
        this.transitDate = toString(this.currentOrder.transitDate);*/
      });
    }

    else{
    this.currentOrder.orderDate = new Date(this.orderDate);
    this.currentOrder.completionDate = new Date(this.completionDate);
    this.currentOrder.orderPlacedDate = new Date(this.orderPlacedDate);
    this.currentOrder.transitDate = new Date(this.transitDate);
    }
  }

  ngOnInit() {
    this.sharedServices.getAllUsers()
      .subscribe(res => {this.allUsers = res.result;
      });
    this.customerServices.getAllCustomers().subscribe(res => {
      this.allCustomers = res.result;
    });
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
    if(customerId === "Add New Customer"){
      this.isNewCustomerDivInvisible=false;
      return;
    }else{
      this.isNewCustomerDivInvisible = true;
    }
   for (var i = 0; i < this.allCustomers.length; i++)
    {
      if (this.allCustomers[i]._id == customerId) {
        this.selectedCustomer = this.allCustomers[i];
        this.currentOrder.customer = this.selectedCustomer;
        this.currentOrder.fromCompany = this.selectedCustomer.fromCompany;
        this.currentOrder.billingAddress[0] = this.selectedCustomer.billingAddress[0];
        this.currentOrder.shippingAddress[0] = this.selectedCustomer.shippingAddress[0];
        this.orderObservableService.changeOrderObject(this.currentOrder);
        break;
        /*this.customerObservableService.changeCustomerObject(this.currentCustomer);*/
      }
    }
  }

  createCustomer(){

    if (!this.newCustomer.fromCompany || !this.newCustomer.contactPerson ||
      !this.newCustomer.contactNumber || !this.newCustomer.shippingAddress[0].line1 ||
      !this.newCustomer.shippingAddress[0].line2 || !this.newCustomer.shippingAddress[0].pinCode ||
      !this.newCustomer.shippingAddress[0].city || !this.newCustomer.billingAddress[0].line1 ||
      !this.newCustomer.billingAddress[0].line2 || !this.newCustomer.billingAddress[0].pinCode ||
      !this.newCustomer.billingAddress[0].city ) {
      console.log("All Fields are required");
    }
    else {
      this.currentOrder.fromCompany = this.newCustomer.fromCompany;
      this.currentOrder.billingAddress[0] = this.newCustomer.billingAddress[0];
      this.currentOrder.shippingAddress[0] = this.newCustomer.shippingAddress[0];
      this.customerServices.createCustomer(this.newCustomer).subscribe
      (res =>
      {this.response = res.json();
        this.currentOrder.customer = this.response.result._id;
        this.isNewCustomerDivInvisible = true;
      });
    }
  }
  copyAddress(){
    this.newCustomer.billingAddress[0].line1 = this.newCustomer.shippingAddress[0].line1;
    this.newCustomer.billingAddress[0].line2 = this.newCustomer.shippingAddress[0].line2;
    this.newCustomer.billingAddress[0].pinCode = this.newCustomer.shippingAddress[0].pinCode;
    this.newCustomer.billingAddress[0].city = this.newCustomer.shippingAddress[0].city;
    this.newCustomer.billingAddress[0].state = this.newCustomer.shippingAddress[0].state;
    this.newCustomer.billingAddress[0].country = this.newCustomer.shippingAddress[0].country;
  }

}
