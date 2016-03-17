import {Component} from 'angular2/core';
import {CreateOrder} from '../../order/components/create-order.component';
import {DataProvider} from "../data-providers/data-provider";
import {OrdersDataProvider} from "../data-providers/orders-data-provider";
import {EmailDataProvider} from "../data-providers/email-data-provider";
import {AudioDataProvider} from "../data-providers/audio-data-provider";

@Component({
  selector: 'inbox',
  templateUrl: 'app/inbox/components/inbox.html',
  styleUrls: ['app/inbox/components/inbox.css'],
  directives: [CreateOrder],
})
export class Inbox {
  itemList : Array<any>;

  constructor() {
    //var dataProvider = new DataProvider("Sammy the Python");
    var ordersDataProvider: DataProvider = new OrdersDataProvider();
    var emailDataProvider: DataProvider = new EmailDataProvider();
    var audioDataProvider: DataProvider = new AudioDataProvider();

    this.itemList = new Array<any>();
    this.itemList = this.itemList.concat(ordersDataProvider.getAll());
    this.itemList = this.itemList.concat(emailDataProvider.getAll());
    this.itemList = this.itemList.concat(audioDataProvider.getAll());
  }

  selectedItem: string;

  displayDetails(item) {
    this.selectedItem = item;
  };
}

