import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'ib-header',
  templateUrl: 'app/inbox/components/header.component.html',
  styleUrls: ['app/inbox/components/header.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class Header {

  constructor() {}

}
