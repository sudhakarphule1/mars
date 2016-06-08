import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {Order} from "../../model/order";

@Component({
  selector: 'ib-order-compact-view',
  templateUrl: 'app/inbox/item-views/order-compact-view.html',
  styles: [ require('./inbox.component.scss') ],
  inputs: ['order']
})
export class OrderCompactView{
  @Input() order: Order;
  @Input() selected:string;

  isPending = true;
  isInProgress = false;
  isComplete = false;
  constructor() {
  }
}

