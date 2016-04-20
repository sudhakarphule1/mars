import {Component, OnInit, OnDestroy} from 'angular2/core';
import {DataProvider} from "./data-providers/data-provider";
import {OrdersDataProvider} from "./data-providers/orders-data-provider";
import {EmailDataProvider} from "./data-providers/email-data-provider";
import {AudioDataProvider} from "./data-providers/audio-data-provider";
import {InboxItem} from "./inbox.model";
import {OrderCompactView} from "./item-views/order-compact-view";
import {EmailCompactView} from "./item-views/email-compact-view";
import {AudioCompactView} from "./item-views/audio-compact-view";
import {CreateOrder} from '../order/components/create-order.component';
import {Order} from "./inbox.model";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {InboxFilterPipe} from "./inbox-filter.pipe"
import {SearchService} from '../share/components/search.service';
import {Subscription}   from 'rxjs/Subscription';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PreviewOrder} from "../order/components/preview-order.component";

@Component({
  selector: 'ib-inbox',
  templateUrl: 'app/inbox/inbox.component.html',
  styleUrls: ['app/inbox/inbox.component.css'],
  directives: [CreateOrder, OrderCompactView, EmailCompactView, AudioCompactView, MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
 // providers: [SearchService],
  pipes:[InboxFilterPipe]
})
@RouteConfig([
  new Route({ path: '/createorder', component: CreateOrder, name: 'CreateOrder', useAsDefault : true}),
  new Route({ path: '/previeworder', component: PreviewOrder, name: 'PreviewOrder'})
])

export class Inbox implements OnInit, OnDestroy {
  errorMessage: string;
  showDetails: boolean = false;
  filterBy: string = '';
  itemList : Array<InboxItem>;
  subscription:Subscription;

  constructor(private orderService: OrdersDataProvider,
              private emailService: EmailDataProvider,
              private audioService: AudioDataProvider,
              private searchService: SearchService,
              private _router: Router) {
    this.subscription =  searchService.applySearch$.subscribe(
      searchString => {
        console.log( "Apply new filter : " + searchString);
        this.filterBy = searchString;
      }
    );
  }

  ngOnInit() {
    this.itemList = new Array<InboxItem>();
    this.getItemList(this.orderService);
    this.getItemList(this.emailService);
    this.getItemList(this.audioService);
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
    console.log(this.itemList);
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

export default class SwitchBasicUsage {
  public data: any = {
    cb1: true,
    cb4: true,
    cb5: false
  };
  public message = 'false';
  public onChange(cbState) {
    this.message = cbState;
  };
}
