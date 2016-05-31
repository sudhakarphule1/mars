/*
import {Component, OnInit, OnDestroy} from 'angular2/core';
import {AudioDataProvider} from "./data-providers/audio-data-provider";
import {OrderCompactView} from "./item-views/order-compact-view";
import {EmailCompactView} from "./item-views/email-compact-view";
import {AudioCompactView} from "./item-views/audio-compact-view";
import {CreateOrder} from '../order/components/create-order.component';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {InboxFilterPipe} from "./inbox-filter.pipe"
import {SearchService} from '../share/components/search.service';
import {Subscription}   from 'rxjs/Subscription';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {InboxItem} from "../model/inbox-item";
import {Orders} from '../order/services/order.service';
import {EmailService} from '../order/services/email.service';
import {OrderLocalStore} from "../order/components/order-local-store";
import {UserAccount} from "../share/components/user-account.component";
import {ProductMaster} from "../master/components/product-master.component";
import {CustomerMaster} from "../master/components/customer-master.component";
import {LogOut} from "../share/components/logout.component";
import {ViewInbox} from "./view-inbox.component";

@Component({
  selector: 'inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styles: [ require('./item-views/list-view.scss') ],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [Orders, EmailService, OrderLocalStore, AudioDataProvider, SearchService],
  pipes:[InboxFilterPipe]
})
@RouteConfig([
  new Route({ path: '/viewInbox/...', component: ViewInbox, name: 'ViewInbox', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: ProductMaster, name: 'Products'}),
  new Route({ path: '/customer', component: CustomerMaster, name: 'Customer'}),
  new Route({ path: '/logout', component: LogOut, name: 'Logout'})
])

export class Inbox implements OnInit, OnDestroy {
  showDetails: boolean = false;
  showHistory: boolean = false;
  filterBy: string = '';
  itemList : Array<InboxItem>;
  subscription:Subscription;

  constructor(private audioService: AudioDataProvider,
              params: RouteParams,
              private orders: Orders,
              private orderLocalStore: OrderLocalStore,
              private emails: EmailService,
              private searchService: SearchService,
              private _router: Router) {
    this.subscription =  searchService.applySearch$.subscribe(
      searchString => {
        this.filterBy = searchString;
      }
    );
    this.showHistory = Boolean(params.get('showHistory'));
  }

  ngOnInit() {
    if(!this.showHistory){
    this.itemList = new Array<InboxItem>();
      this.orders.getAllOrders().subscribe(items => {
        this.itemList = this.itemList.concat(items);
      }
    );
      this.emails.getAllEmails().subscribe(items => this.itemList = this.itemList.concat(items));
      this.audioService.getAll().subscribe(items => this.itemList = this.itemList.concat(items));
    }
    else if (this.showHistory === true){
      this.itemList = new Array<InboxItem>();
      this.orders.getOrdersByStatus("Completed").subscribe(res => this.itemList = res);

    }
  }

  ngOnDestroy(){
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  selected : string;
  navigateTo(item: InboxItem) {
    this.selected = item.id;
    this.orderLocalStore.inboxItem = item;
    let link;
    if( item.type == 'Order' ) {
      link = ['ViewOrder', { orderId: item.id }];
    } else {
      link = ['CreateOrder', { leadId: item.id }];
    }
    this._router.navigate(link);
  }
}

*/

import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES, Media} from "ng2-material/all";
import {ViewInbox} from "./inbox-itemlist.component.ts";
import {Header} from "../share/components/header.component";
import {UserAccount} from "../share/components/user-account.component";
import {ProductMaster} from "../master/components/product-master.component";
import {CustomerMaster} from "../master/components/customer-master.component";
import {LogOut} from "../share/components/logout.component";
import {SearchService} from "../share/components/search.service";

@Component({
  selector: 'inbox',
  providers: [HTTP_PROVIDERS, SearchService],
  templateUrl: 'app/inbox/inbox.component.html',
  styles: [ require('./item-views/list-view.scss') ],
  directives: [ROUTER_DIRECTIVES, Header, MATERIAL_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/viewInbox/...', component: ViewInbox, name: 'ViewInbox', useAsDefault: true}),
  new Route({ path: '/userAccount', component: UserAccount, name: 'UserAccount'}),
  new Route({ path: '/products', component: ProductMaster, name: 'Products'}),
  new Route({ path: '/customer', component: CustomerMaster, name: 'Customer'}),
  new Route({ path: '/logout', component: LogOut, name: 'Logout'})
])

export class Inbox {

}
