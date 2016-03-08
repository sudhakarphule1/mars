import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MyOrders} from '../myOrders/myOrders';

@Component({
  selector: 'oa-header',
  templateUrl: 'app/components/header/header.html',
  styleUrls: ['app/components/header/header.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class Header {

  constructor() {}

}
