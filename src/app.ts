///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {SeedApp} from './app/inbox-app';
// Add all operators to Observable
import 'rxjs/Rx';

bootstrap(SeedApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
  .catch(err => console.error(err));
