import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';

@Component({
  selector: 'customers',
  templateUrl: 'app/master/components/customer-master.component.html',
  styleUrls: ['app/master/components/customer-master.component.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Customers {

}
