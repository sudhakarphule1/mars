/**
 * Created by chetan on 31/5/16.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AudioDataProvider} from "./data-providers/audio-data-provider";
import {OrderCompactView} from "./item-views/order-compact-view";
import {EmailCompactView} from "./item-views/email-compact-view";
import {AudioCompactView} from "./item-views/audio-compact-view";
import {CreateOrder} from '../order/components/create-order.component';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {InboxFilterPipe} from "./inbox-filter.pipe"
import {SearchService} from '../share/components/search.service';
import {Subscription}   from 'rxjs/Subscription';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {InboxItem} from "../model/inbox-item";
import {Orders} from '../order/services/order.service';
import {EmailService} from '../order/services/email.service';
import {OrderLocalStore} from "../order/components/order-local-store";

@Component({
  selector: 'inbox-itemlist',
  templateUrl: 'app/inbox/inbox-itemlist.component.html',
  styles: [ require('./item-views/inbox.component.scss') ],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [Orders, EmailService, OrderLocalStore, AudioDataProvider, SearchService],
  pipes:[InboxFilterPipe]
})

@RouteConfig([
  new Route({ path: '/createorder', component: CreateOrder, name: 'CreateOrder', useAsDefault : true}),
])

export class ViewInbox implements OnInit, OnDestroy {
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
    this.selected = item._id;
    this.orderLocalStore.inboxItem = item;
    let link;
    if( item.type == 'Order' ) {
      link = ['ViewOrder', { orderId: item._id }];
    } else {
      link = ['CreateOrder', { orderId: item._id }];
    }
    this._router.navigate(link);
  }
}

