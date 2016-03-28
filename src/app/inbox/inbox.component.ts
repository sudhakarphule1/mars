import {Component, OnInit} from 'angular2/core';
import {DataProvider} from "./data-providers/data-provider";
import {OrdersDataProvider} from "./data-providers/orders-data-provider";
import {EmailDataProvider} from "./data-providers/email-data-provider";
import {AudioDataProvider} from "./data-providers/audio-data-provider";
import {InboxItem} from "./inbox.model";
import {OrderCompactView} from "./item-views/order-compact-view";
import {EmailCompactView} from "./item-views/email-compact-view";
import {AudioCompactView} from "./item-views/audio-compact-view";
import {CreateOrder} from '../order/components/create-order.component';
import {Order} from "./inbox.model";

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styleUrls: ['app/inbox/inbox.component.css'],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView]
})
export class Inbox implements OnInit {
  errorMessage: string;
  showDetails: boolean = false;
  itemList : Array<InboxItem>;

  constructor(private orderService: OrdersDataProvider,
              private emailService: EmailDataProvider,
              private audioService: AudioDataProvider) {
  }

  ngOnInit() {
    this.itemList = new Array<InboxItem>();
    this.getItemList(this.orderService);
    this.getItemList(this.emailService);
    this.getItemList(this.audioService);
  }

  getItemList(service : DataProvider) {
    service.getAll()
      .subscribe(
        items => this.itemList = this.itemList.concat(items));
  }

  selectedItem: string;

  displayDetails(item) {
    console.log(this.itemList);
    this.selectedItem = item;
  };
}
