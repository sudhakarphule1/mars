import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {Github} from '../../services/github';

@Component({
  selector: 'customers',
  templateUrl: 'app/components/customers/customers.html',
  styleUrls: ['app/components/customers/customers.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Customers {

}
