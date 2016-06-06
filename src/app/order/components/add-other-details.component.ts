import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {Order} from "../../model/order";
import {Router, RouteParams} from "@angular/router-deprecated";
import {OrderLocalStore} from "./order-local-store";
import {CustomerServices} from "../services/customer.service";
import {Customer} from "../../model/customer";
import {Contract} from "../../model/contract";
import {Item} from "../../model/item";
import {CustomerObservableService} from "../services/customer.observable.service";
import {Input} from "angular2/core";
import {Subscription} from "rxjs/Subscription";
import {OrderObservableService} from "../services/order.observable.service";

@Component({
  selector: 'add-other-details',
  providers: [HTTP_PROVIDERS, CustomerServices],
  templateUrl: 'app/order/components/add-other-details.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class AddOtherDetails implements  OnInit{

  leadId: string;
  displayError = false;
  errorMessage: string = "";
  currentOrder: Order = new Order();
  private allCustomers: Array<Customer>;
  private selectedCustomer: Customer = new Customer();
  private showDetails: boolean = false;
  private oldCustomers: boolean = true;
  newCustomer : Customer = new Customer();
  private displayCustomer:boolean = false;
  private customerMessage:string = '';
  private response;
  private items: Array<Item>;
  private isCustomerSelected : boolean =true;
  private selectedItemId: string;
  private currentCustomer : Customer= new Customer();
  @Input() currentCustomerId : string;
  private subscription: Subscription;
  private  customerId : string;

  constructor(params: RouteParams,
              private _router: Router,
              private orderLocalStore : OrderLocalStore,
              private customerServices: CustomerServices,
              private orderObservableService: OrderObservableService,
              private customerObservableService :CustomerObservableService) {
    this.leadId = params.get('leadId');
    this.currentOrder = orderLocalStore.order;
/*    this.currentOrder.orderDate = new Date();
    this.currentOrder.completionDate = new Date();*/
    this.items = orderLocalStore.items;
    this.subscription =  customerObservableService.filterCustomers$.subscribe(
        customerObject => {
          this.currentCustomer = customerObject;
          this.isCustomerSelected = false;
        }
    );

  }


  ngOnInit() {
    this.customerServices.getAllCustomers().subscribe(res => {this.allCustomers = res.result;});
  }

  proceedNext(){

    if(this.oldCustomers){
    this.orderLocalStore.customer = this.selectedCustomer;
      console.log(this.orderLocalStore.customer);
    }
    else{
      this.orderLocalStore.customer = this.newCustomer;
      console.log(this.orderLocalStore.customer);
    }
    if(!this.currentOrder.fromCompany || !this.currentOrder.orderType || !this.currentOrder.remarks
      || !this.currentOrder.defaultTask.completeBy || !this.currentOrder.defaultTask.status){
      this.errorMessage = "One of the mandatory fields is missing";
      this.displayError = true;
    }

    else{
      this._router.navigate(['PreviewOrder']);
    }
  }

  goToPrevious(){
    this._router.navigate(['PreviewItems']);
  }

  cancelOrder(){
    this._router.navigate(['AddItems']);
    this.currentOrder.items = [];
    for(var i in this.currentOrder.items){
      this.currentOrder.items[i].qty = 0 ;
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

  createCustomer(){

      if (!this.newCustomer.fromCompany || !this.newCustomer.contactPerson ||
        !this.newCustomer.contactNumber || !this.newCustomer.shippingAddress.line1 ||
        !this.newCustomer.shippingAddress.line2 || !this.newCustomer.shippingAddress.pinCode ||
        !this.newCustomer.shippingAddress.city || !this.newCustomer.shippingAddress.state ||
        !this.newCustomer.shippingAddress.country || !this.newCustomer.billingAddress.line1 ||
        !this.newCustomer.billingAddress.line2 || !this.newCustomer.billingAddress.pinCode ||
        !this.newCustomer.billingAddress.city || !this.newCustomer.billingAddress.state ||
        !this.newCustomer.billingAddress.country) {
        this.errorMessage = "One of the mandatory fields is missing";
        this.displayError = true;
      }
      else if (isNaN(this.newCustomer.contactNumber)) {
        this.errorMessage = "Contact Number needs to be numeric";
        this.displayError = true;
      }
      else if (!isNaN(this.newCustomer.contactNumber) &&
        (isNaN(this.newCustomer.billingAddress.pinCode) || isNaN(this.newCustomer.shippingAddress.pinCode))) {
        this.errorMessage = "Pin Code needs to be numeric";
        this.displayError = true;
      }
      else {
        this.displayError = false;
        this.currentOrder.fromCompany = this.newCustomer.fromCompany;
        this.currentOrder.billingAddress = this.newCustomer.billingAddress;
        this.currentOrder.shippingAddress = this.newCustomer.shippingAddress;
        this.customerServices.createCustomer(this.newCustomer).subscribe
          (res =>
          {this.response = res.json();
            this.currentOrder.customer = this.response.result._id;
          });
        this.customerMessage = "A new customer has been created.";
        this.displayCustomer = true;
      }
  }

  newContract(){
    var  contract : Contract = new Contract();
    /*contract.item = " ";
    contract.productId = " ";
    contract.unitRate = 4;*/
    console.log("new contract element is created.");
    this.selectedCustomer.contract.push(contract);
  }

  onSelect(productId) {
    /*this.selectedProduct = null;*/
    /*for (var i = 0; i < this.items.length; i++)
    {
      if (this.ite[i].id == productId) {
        this.selectedProduct = this.products[i];
      }
    }*/
    console.log(this.items);
    console.log("git hti fir" + productId);
  }
}
