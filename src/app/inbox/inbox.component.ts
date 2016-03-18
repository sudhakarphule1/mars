import {Component} from 'angular2/core';
import {DataProvider} from "./data-providers/data-provider";
import {OrdersDataProvider} from "./data-providers/orders-data-provider";
import {EmailDataProvider} from "./data-providers/email-data-provider";
import {AudioDataProvider} from "./data-providers/audio-data-provider";
import {InboxItem} from "./inbox.model";
import {OrderCompactView} from "./item-views/order-compact-view";
import {EmailCompactView} from "./item-views/email-compact-view";
import {AudioCompactView} from "./item-views/audio-compact-view";
import {CreateOrder} from '../order/components/create-order.component';

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styleUrls: ['app/inbox/inbox.component.css'],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView]
})
export class Inbox {
  itemList : Array<InboxItem>;

  constructor() {
    //var dataProvider = new DataProvider("Sammy the Python");
    var ordersDataProvider: DataProvider = new OrdersDataProvider();
    var emailDataProvider: DataProvider = new EmailDataProvider();
    var audioDataProvider: DataProvider = new AudioDataProvider();

    this.itemList = new Array<InboxItem>();
    this.itemList = this.itemList.concat(ordersDataProvider.getAll());
    this.itemList = this.itemList.concat(emailDataProvider.getAll());
    this.itemList = this.itemList.concat(audioDataProvider.getAll());
    console.log(this.itemList );
  }

  selectedItem: string;

  displayDetails(item) {
    this.selectedItem = item;
  };
}

