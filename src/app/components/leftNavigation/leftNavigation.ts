import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MyOrders} from '../myOrders/myOrders';

@Component({
  selector: 'oa-left-nav',
  templateUrl: 'app/components/leftNavigation/leftNavigation.html',
  styleUrls: ['app/components/leftNavigation/leftNavigation.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class LeftNavigation {

  constructor() {}

}
