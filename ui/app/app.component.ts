import {View, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {VendorMainPageComponent} from './vendor/vendor_home_page/vendor_main_page';
import {VendorOrdersComponent} from './vendor/vendor_orders/vendor_orders';

//let template = require('./app.component.html');

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path: '/vendor_main_page',   name: 'VendorMainPage', component: VendorMainPageComponent},
  {path: '/vendor_orders', name: 'VendorOrders', component: VendorOrdersComponent}
])
export class AppComponent { }