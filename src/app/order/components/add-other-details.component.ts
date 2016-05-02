import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Order} from "../../model/order";
import {RouteParams, Router} from "angular2/router";
import {OrderLocalStore} from "./order-local-store";

@Component({
  selector: 'addOtherDetails',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/add-other-details.component.html',
  styleUrls: ['app/order/components/add-other-details.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class AddOtherDetails {

  leadId: string;
  displayError = false;
  errorMessage: string = "";

  currentOrder: Order = new Order();

  constructor(params: RouteParams,
              private _router: Router,
              private orderLocalStore : OrderLocalStore) {
    this.leadId = params.get('leadId');
    this.currentOrder = orderLocalStore.order;
    this.currentOrder.orderDate = new Date();
    this.currentOrder.completionDate = new Date();
  }

  proceedNext(){
    this.currentOrder.totalAmount = 3434;
    if(!this.currentOrder.fromCompany || !this.currentOrder.orderType || !this.currentOrder.remarks ||
      !this.currentOrder.contactPerson || !this.currentOrder.contactNumber ||
      !this.currentOrder.shippingAddress.line1 || !this.currentOrder.shippingAddress.line2 ||
      !this.currentOrder.shippingAddress.pinCode || !this.currentOrder.shippingAddress.city ||
      !this.currentOrder.shippingAddress.state || !this.currentOrder.shippingAddress.country ||
      !this.currentOrder.billingAddress.line1 || !this.currentOrder.billingAddress.line2 ||
      !this.currentOrder.billingAddress.pinCode || !this.currentOrder.billingAddress.city ||
      !this.currentOrder.billingAddress.state || !this.currentOrder.billingAddress.country ||
      !this.currentOrder.defaultTask.completeBy || !this.currentOrder.defaultTask.status){
      this.errorMessage = "One of the mandatory fields is missing";
      this.displayError = true;
    }
    else if (isNaN(this.currentOrder.contactNumber)){
      this.errorMessage = "Contact Number needs to be numeric";
      this.displayError = true;
    }
    else if (!isNaN(this.currentOrder.contactNumber) &&
      (isNaN(this.currentOrder.billingAddress.pinCode) || isNaN(this.currentOrder.shippingAddress.pinCode))){
      this.errorMessage = "Pin Code needs to be numeric";
      this.displayError = true;
    }
    else{
      this._router.navigate(['PreviewOrder']);
      /*this.displayError = false;*/
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
    this.currentOrder.billingAddress.line1 = this.currentOrder.shippingAddress.line1;
    this.currentOrder.billingAddress.line2 = this.currentOrder.shippingAddress.line2;
    this.currentOrder.billingAddress.pinCode = this.currentOrder.shippingAddress.pinCode;
    this.currentOrder.billingAddress.city = this.currentOrder.shippingAddress.city;
    this.currentOrder.billingAddress.state = this.currentOrder.shippingAddress.state;
    this.currentOrder.billingAddress.country = this.currentOrder.shippingAddress.country;
  }

}
