import {Component} from 'angular2/core';
import {Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Inbox} from './inbox/inbox.component';
import {Login} from "./share/components/login.component.ts";

@Component({
  selector: 'main-app',
  templateUrl: 'app/main-app.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/login', component: Login, name: 'Login', useAsDefault: true}),
  new Route({ path: '/inbox/...', component: Inbox, name: 'Inbox'})
])

export class MainApp {

}
