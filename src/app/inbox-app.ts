import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Inbox} from './inbox/components/inbox';
import {UserAccount} from './share/components/user-account.component';
import {ProductMaster} from "./master/components/product-master.component";
import {CustomerMaster} from "./master/components/customer-master.component";
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
  new Route({ path: '/inbox', component: Inbox, name: 'Inbox', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: ProductMaster, name: 'Products'}),
  new Route({ path: '/customers', component: CustomerMaster, name: 'Customers'}),
  new Route({ path: '/logOut', component: LogOut, name: 'LogOut'})
])

export class SeedApp {

  constructor() {}

}
