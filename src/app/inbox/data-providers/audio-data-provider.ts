import {LeadsDataProvider} from "./leads-data-provider";
import {DataProvider} from "./data-provider";

export class AudioDataProvider implements DataProvider {
  constructor() {
  }

  getAll() {
    var items:Array<any>;
    items = new Array<any>();
    items.push({
      companyName: 'Infosys',
      orderDetails: '6 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '03/24/2016',
      completionDate: '03/24/2016',
      status: 'In-Progress',
      orderType: 'email'
    });
    items.push({
      companyName: 'HSBC',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/10/2016',
      completionDate: '03/24/2016',
      status: 'Completed',
      orderType: 'online'
    })
    return items;
  }
}
