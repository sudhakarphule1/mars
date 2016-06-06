import {Injectable} from "@angular/core";
import {Order} from "../../model/order";
import {InboxItem} from "../../model/inbox-item";
import {Customer} from "../../model/customer";
import {Item} from "../../model/item";

@Injectable()
export class OrderLocalStore {
  order: Order;
  inboxItem: InboxItem;
  customer: Customer;
  items: Array<Item>;
}
