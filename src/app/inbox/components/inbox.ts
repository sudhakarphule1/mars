import {Component} from 'angular2/core';
import {CreateOrder} from '../../order/components/create-order.component';
import {DataProvider} from "../data-providers/data-provider";
import {OrdersDataProvider} from "../data-providers/orders-data-provider";
import {EmailDataProvider} from "../data-providers/email-data-provider";
import {AudioDataProvider} from "../data-providers/audio-data-provider";
import {OrderItem} from "./inbox-items/order-item-component";
import {EmailItem} from "./inbox-items/email-item-component";
import {InboxItem} from "../data-providers/data-provider";

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/components/inbox.html',
  styleUrls: ['app/inbox/components/inbox.css'],
  directives: [CreateOrder, OrderItem, EmailItem]
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

