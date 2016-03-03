import {Component} from 'angular2/core';
import {Http} from 'angular2/http';


@Component({
  selector: 'myOrders',
  templateUrl: 'app/components/myOrders/myOrders.html',
  styleUrls: ['app/components/myOrders/myOrders.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class MyOrders {

  orders = [{companyName: 'Infosys',
    orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
    orderDate: '03/24/2016',
    orderType: 'email'},
    {companyName: 'HSBC',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/10/2016',
      orderType: 'online'},
    {companyName: 'IBM',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '06/30/2016',
      orderType: 'phone'},
    {companyName: 'Cognizant',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/01/2016',
      orderType: 'manual'},
    {companyName: 'Quick Heal',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/20/2016',
      orderType: 'email'},
    {companyName: 'Infosys',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '03/24/2016',
      orderType: 'email'},
    {companyName: 'HSBC',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '02/10/2016',
      orderType: 'online'},
    {companyName: 'IBM',
      orderDetails: '5 Tissue boxes, 10 Hand dryers, 20 paper towels',
      orderDate: '06/30/2016',
      orderType: 'phone'}];

  selectedItem: string;

  displayDetails(item) { this.selectedItem = item; }
}

