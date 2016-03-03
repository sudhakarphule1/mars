import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MyOrders} from './components/myOrders/myOrders';
import {UserAccount} from './components/userAccount/userAccount';
import {Notes} from './components/notes/notes';
import {Products} from "./components/products/products";
import {Customers} from "./components/customers/customers";
import {LogOut} from "./components/logOut/logOut";
import {AppHeader} from "./components/appHeader/appHeader";

@Component({
  selector: 'seed-app',
  providers: [],
  templateUrl: 'app/seed-app.html',
  styleUrls: ['app/seed-app.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/myOrders', component: MyOrders, name: 'MyOrders', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/notes', component: Notes, name: 'Notes'}),
  new Route({ path: '/products', component: Products, name: 'Products'}),
  new Route({ path: '/customers', component: Customers, name: 'Customers'}),
  new Route({ path: '/logOut', component: LogOut, name: 'LogOut'})
])
export class SeedApp {

  constructor() {}

}
