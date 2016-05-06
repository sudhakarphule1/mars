import {Injectable} from "angular2/core";
import {Order} from "../../model/order";
import {InboxItem} from "../../model/inbox-item";

@Injectable()
export class OrderLocalStore {
  order: Order;
  inboxItem: InboxItem;
}
