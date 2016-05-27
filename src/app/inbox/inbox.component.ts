import {Component, OnInit, OnDestroy, AfterViewInit, AfterContentChecked} from 'angular2/core';
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
import {ViewOrder} from "../order/components/view-order.component.ts";
import {InboxItem} from "../model/inbox-item";
import {Orders} from '../order/services/order.service';
import {EmailService} from '../order/services/email.service';
import {OrderLocalStore} from "../order/components/order-local-store";

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styles: [ require('./item-views/list-view.scss') ],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [Orders, EmailService, OrderLocalStore],
  pipes:[InboxFilterPipe]
})
@RouteConfig([
  new Route({ path: '/createorder/...', component: CreateOrder, name: 'CreateOrder', useAsDefault : true}),
  new Route({ path: '/vieworder', component: ViewOrder, name: 'ViewOrder'})
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

