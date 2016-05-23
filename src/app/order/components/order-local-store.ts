import {Injectable} from "angular2/core";
import {Order} from "../../model/order";
import {InboxItem} from "../../model/inbox-item";
import {Customer} from "../../model/customer";

@Injectable()
export class OrderLocalStore {
  order: Order;
  inboxItem: InboxItem;
  customer: Customer;
}
