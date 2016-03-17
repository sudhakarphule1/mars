import {Component} from 'angular2/core';

@Component({
  selector: 'ib-order-item',
  templateUrl: 'app/inbox/components/inbox-items/order-item-component.html',
  styleUrls: ['app/inbox/components/inbox-items/order-item-component.css'],
  inputs: ['order']
})
export class OrderItem {
  order;

  constructor() {
  }
}

