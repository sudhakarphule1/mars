import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MyOrders} from '../myOrders/myOrders';

@Component({
  selector: 'oa-header',
  providers: [],
  templateUrl: 'app/components/header/header.html',
  styleUrls: ['app/components/header/header.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/myOrders', component: MyOrders, name: 'MyOrders', useAsDefault: true}),
])

export class Header {

  constructor() {}

}
