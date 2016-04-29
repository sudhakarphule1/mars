import {Injectable} from "angular2/core";
import {Order} from "../../model/order";

@Injectable()
export class OrderLocalStore {
  order: Order;
}
