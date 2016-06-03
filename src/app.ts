///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {MATERIAL_PROVIDERS} from 'ng2-material/all';
import {HttpClient} from "./app/share/components/interceptor"


import {MainApp} from './app/main-app';
// Add all operators to Observable
import 'rxjs/Rx';
import {MessageService} from "./app/share/services/message.service";

bootstrap(MainApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, MATERIAL_PROVIDERS, HttpClient, MessageService])
  .catch(err => console.error(err));
