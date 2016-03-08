import {Component} from 'angular2/core';
import {OrderEntry} from '../../order/components/create-order.component';

@Component({
  selector: 'myOrders',
  templateUrl: 'app/inbox/components/myOrders.html',
  styleUrls: ['app/inbox/components/myOrders.css'],
  providers: [],
  directives: [OrderEntry],
  pipes: []
})
export class MyOrders {

  /*quantity: number = 0;*/
  orders = [{companyName: 'Infosys',
    orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
    orderDate: '03/24/2016',
    completionDate: '03/24/2016',
    status: 'In-Progress',
    orderType: 'email'},
    {companyName: 'HSBC',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/10/2016',
      completionDate: '03/24/2016',
      status: 'Completed',
      orderType: 'online'},
    {companyName: 'IBM',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '06/30/2016',
      completionDate: '03/24/2016',
      status: 'Completed',
      orderType: 'phone'},
    {companyName: 'Cognizant',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/01/2016',
      completionDate: '03/24/2016',
      status: 'In-Progress',
      orderType: 'manual'},
    {companyName: 'Quick Heal',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/20/2016',
      completionDate: '03/24/2016',
      status: 'Completed',
      orderType: 'email'},
    {companyName: 'Infosys',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '03/24/2016',
      completionDate: '03/24/2016',
      status: 'In-Progress',
      orderType: 'email'},
    {companyName: 'HSBC',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/10/2016',
      completionDate: '03/24/2016',
      status: 'In-Progress',
      orderType: 'online'},
    {companyName: 'IBM',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '06/30/2016',
      completionDate: '03/24/2016',
      status: 'Completed',
      orderType: 'phone'}];

  selectedItem: string;

  displayDetails(item) { this.selectedItem = item; };

}

