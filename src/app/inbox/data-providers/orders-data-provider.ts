import {DataProvider} from "./data-provider";
import {Order} from "./data-provider";

export class OrdersDataProvider implements DataProvider {
  constructor() {
  }

  getAll() {
    var order = new Order();
    order.companyName = 'Infosys';
    order.orderDetails = '6 Tissue boxes, 10 Hand dryers, 20 paper towels';
    order.orderDate = '03/24/2016';
    order.completionDate = '03/24/2016';
    order.status = 'In-Progress';
    order.orderType = 'email'

    var items:Array<any>;
    items = new Array<Order>();
    items.push(order);
    return items;
  }
}
