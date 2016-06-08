import {Component} from '@angular/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES, Media} from "ng2-material";
import {ViewInbox} from "./inbox-itemlist.component.ts";
import {Header} from "../share/components/header.component";
import {UserAccount} from "../share/components/user-account.component";
import {ProductMaster} from "../master/components/product-master.component";
import {CustomerMaster} from "../master/components/customer-master.component";
import {SearchService} from "../share/components/search.service";
import {MessageService} from "../share/services/message.service";
import {CustomerObservableService} from "../order/services/customer.observable.service";
import {OrderObservableService} from "../order/services/order.observable.service";

@Component({
  selector: 'inbox',
  providers: [HTTP_PROVIDERS, SearchService, CustomerObservableService, OrderObservableService],
  templateUrl: 'app/inbox/inbox.component.html',
  styles: [ require('./item-views/inbox.component.scss') ],
  directives: [ROUTER_DIRECTIVES, Header],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/viewInbox/...', component: ViewInbox, name: 'ViewInbox', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: ProductMaster, name: 'Products'}),
  new Route({ path: '/customer', component: CustomerMaster, name: 'Customer'})
])

export class Inbox {

}
