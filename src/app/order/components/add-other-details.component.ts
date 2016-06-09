import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
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
import {Orders} from "../services/order.service";

@Component({
  selector: 'oa-order-other-details',
  providers: [HTTP_PROVIDERS, CustomerServices],
  templateUrl: 'app/order/components/add-other-details.component.html',
  styles: [ require('./order.components.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class AddOtherDetails {

  leadId: string;
  displayError: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  displaySuccess: boolean = false;
  private currentOrder: Order = new Order();
  private allCustomers: Array<Customer>;
  private selectedCustomer: Customer = new Customer();
  private showDetails: boolean = false;
  private oldCustomers: boolean = true;
  newCustomer : Customer = new Customer();
  private displayCustomer:boolean = false;
  private customerMessage:string = '';
  private response;
  private isCustomerSelected : boolean = true;
  private selectedItemId: string;
  private currentCustomer : Customer= new Customer();
  @Input() currentCustomerId : string;
  private subscription: Subscription;
  private  customerId : string;

  constructor(params: RouteParams,
              private orders: Orders,
              private _router: Router,
              private orderLocalStore : OrderLocalStore,
              private customerServices: CustomerServices,
              private orderObservableService: OrderObservableService,
              private customerObservableService :CustomerObservableService) {
    this.leadId = params.get('leadId');
    this.currentOrder.customer = new Customer;
    this.subscription =  orderObservableService.filterOrders$.subscribe(
        orderObject => {
          this.currentOrder = orderObject;
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

  placeOrder(){

    console.log(this.currentOrder);

    if(this.currentOrder.items.length === 0){
      this.errorMessage = "You haven't selected any items for your order.";
      this.displayError = true;
    }
    else if(!this.currentOrder.defaultTask.assignedTo.firstName){
      this.errorMessage = "You haven't assigned this order to anyone.";
      this.displayError = true;
    }
    else{
      this.orders.createOrder(this.currentOrder).subscribe(res => this.response = res);
      this.successMessage = "Your order has been created.";
      this.displaySuccess = true;
    }
  }
}
