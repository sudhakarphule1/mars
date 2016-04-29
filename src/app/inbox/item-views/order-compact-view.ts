import {Component} from 'angular2/core';


@Component({
  selector: 'ib-order-compact-view',
  templateUrl: 'app/inbox/item-views/order-compact-view.html',
  styles: [ require('./list-view.scss') ],
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

