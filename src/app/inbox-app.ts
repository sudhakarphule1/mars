import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MyOrders} from './inbox/components/myOrders';
import {UserAccount} from './share/components/user-account.component';
import {Products} from "./master/components/product-master.component";
import {Customers} from "./master/components/customer-master.component";
import {LogOut} from "./share/components/logout.component";
import {Header} from "./inbox/components/header.component";
import {LeftNavigation} from "./inbox/components/left.navigation.component";

@Component({
  selector: 'inbox-app',
  providers: [],
  templateUrl: 'app/inbox-app.html',
  styleUrls: ['app/inbox-app.css'],
  directives: [ROUTER_DIRECTIVES, Header, LeftNavigation],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/myOrders', component: MyOrders, name: 'MyOrders', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: Products, name: 'Products'}),
  new Route({ path: '/customers', component: Customers, name: 'Customers'}),
  new Route({ path: '/logOut', component: LogOut, name: 'LogOut'})
])

export class SeedApp {

  constructor() {}

}
