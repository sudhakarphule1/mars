import {Component} from '@angular/core';
import {Router, RouteConfig, Route, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Inbox} from './inbox/inbox.component';
import {Login} from "./share/components/login.component.ts";

@Component({
  selector: 'main-app',
  templateUrl: 'app/main-app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  new Route({ path: '/login', component: Login, name: 'Login', useAsDefault: true}),
  new Route({ path: '/inbox/...', component: Inbox, name: 'Inbox'})
])

export class MainApp {

}
