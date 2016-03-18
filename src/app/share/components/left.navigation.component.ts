import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'ib-left-nav',
  templateUrl: 'app/share/components/left-navigation.component.html',
  styleUrls: ['app/share/components/left-navigation.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class LeftNavigation {

  constructor() {}

}
