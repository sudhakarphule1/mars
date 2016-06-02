import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OrderHeader} from "./order-header.component";
import {AddOtherDetails} from "./add-other-details.component";
import {AddItems} from "./add-items.component";

@Component({
  selector: 'create-order',
  templateUrl: 'app/order/components/create-order.component.html',
  styles: [ require('./common.scss') ],
  providers: [],
  directives: [OrderHeader, AddOtherDetails, AddItems],
})

export class CreateOrder{

  leadId: string;

  constructor(params: RouteParams) {
    this.leadId = params.get('orderId');
  }

}
