import {Component, OnInit, OnDestroy} from 'angular2/core';
import {DataProvider} from "./data-providers/data-provider";
import {OrdersDataProvider} from "./data-providers/orders-data-provider";
import {EmailDataProvider} from "./data-providers/email-data-provider";
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

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styleUrls: ['app/inbox/inbox.component.css'],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [Orders],
  pipes:[InboxFilterPipe]
})
@RouteConfig([
  new Route({ path: '/createorder/...', component: CreateOrder, name: 'CreateOrder', useAsDefault : true}),
  new Route({ path: '/previeworder', component: ViewOrder, name: 'ViewOrder'})
])

export class Inbox implements OnInit, OnDestroy {
  errorMessage: string;
  showDetails: boolean = false;
  showHistory: boolean = false;
  filterBy: string = '';
  itemList : Array<InboxItem>;
  subscription:Subscription;

  constructor(private orderService: OrdersDataProvider,
              private emailService: EmailDataProvider,
              private audioService: AudioDataProvider,
              params: RouteParams,
              private orders: Orders,
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
    this.getItemList(this.orderService);
    this.getItemList(this.emailService);
    this.getItemList(this.audioService);
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

  getItemList(service : DataProvider) {
    service.getAll()
      .subscribe(
        items => this.itemList = this.itemList.concat(items));
  }

  selectedItem: string;

  displayDetails(item) {
    this.selectedItem = item;
  };

  navigateTo(item: InboxItem) {
    let link;
    if( item.type == 'Order' ) {
      link = ['PreviewOrder', { orderId: item.id }];
    } else {
      link = ['CreateOrder', { leadId: item.id }];
    }
    this._router.navigate(link);
  }
}

