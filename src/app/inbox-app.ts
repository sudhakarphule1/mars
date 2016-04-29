import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Inbox} from './inbox/inbox.component';
import {UserAccount} from './share/components/user-account.component';
import {ProductMaster} from "./master/components/product-master.component";
import {CustomerMaster} from "./master/components/customer-master.component";
import {LogOut} from "./share/components/logout.component";
import {Header} from "./share/components/header.component";
import {LeftNavigation} from "./share/components/left.navigation.component";
import {HTTP_PROVIDERS}    from 'angular2/http';
/*import {OrdersDataProvider} from "./inbox/data-providers/orders-data-provider";
import {EmailDataProvider} from "./inbox/data-providers/email-data-provider";*/
import {AudioDataProvider} from "./inbox/data-providers/audio-data-provider";
import {MATERIAL_DIRECTIVES, Media} from "ng2-material/all";
import {SearchService} from './share/components/search.service';

@Component({
  selector: 'inbox-app',
  providers: [HTTP_PROVIDERS, AudioDataProvider, SearchService],
  templateUrl: 'app/inbox-app.html',
  styleUrls: ['app/inbox-app.css'],
  directives: [ROUTER_DIRECTIVES, Header, LeftNavigation, MATERIAL_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/inbox/...', component: Inbox, name: 'Inbox', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: ProductMaster, name: 'Products'}),
  new Route({ path: '/customer', component: CustomerMaster, name: 'Customer'}),
  new Route({ path: '/logout', component: LogOut, name: 'Logout'})
])

export class OrderApp {

  hasMedia(breakSize: string): boolean {
    return true;
  //  return Media.hasMedia(breakSize);
  }
}
