import {Component} from 'angular2/core';

@Component({
  selector: 'inbox',
  templateUrl: 'app/inbox/components/inbox-items/order-item-component.html',
  styleUrls: ['app/inbox/components/order-item-component.css']
})
export class Inbox {
  itemList : Array<any>;

  constructor() {
  }
}

