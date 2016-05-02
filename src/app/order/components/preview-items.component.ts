/**
 * Created by chetan on 27/4/16.
 */
import {Component} from 'angular2/core';
import {Order} from "../../model/order";
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {OrderLocalStore} from "./order-local-store";

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'previewItems',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/preview-items.component.html',
  styleUrls: ['app/order/components/preview-items.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})

export class PreviewItems {

  leadId: string;
  currentOrder: Order = new Order();

  constructor(params: RouteParams,
              private _router: Router,
              private orderLocalStore : OrderLocalStore ) {
    this.leadId = params.get('leadId');
    this.currentOrder = orderLocalStore.order;
    console.log(this.currentOrder);
  }

  removeItem(item){
    var index = this.currentOrder.items.indexOf(item);
    this.currentOrder.items.splice(index, 1);
    if(this.currentOrder.items.length == 0){
      this._router.navigate(['AddItems']);
    }
  }

  confirmOrder() {
    this._router.navigate(['AddOtherDetails']);
  }

  goToPrevious(){
    this._router.navigate(['AddItems']);
    this.currentOrder.items = [];
    for(var i in this.currentOrder.items){
      this.currentOrder.items[i].qty = 0 ;
    }
  }

  cancelOrder(){
    this._router.navigate(['AddItems']);
    this.currentOrder.items = [];
    for(var i in this.currentOrder.items){
      this.currentOrder.items[i].qty = 0 ;
    }
  }
}
