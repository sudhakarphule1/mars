import {Component} from 'angular2/core';
import {Orders} from '../../order/services/order.service';

@Component({
  selector: 'ib-order-compact-view',
  templateUrl: 'app/inbox/item-views/order-compact-view.html',
  styleUrls: ['app/inbox/item-views/order-compact-view.css'],
  inputs: ['order']
})
export class OrderCompactView{
  order;
  isPending = true;
  isInProgress = false;
  isComplete = false;
  constructor() {
  }
}

