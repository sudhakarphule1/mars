import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {MainApp} from './app/main-app';
import {MessageService} from "./app/share/services/message.service";
import {HttpClient} from "./app/share/components/interceptor";
import {MATERIAL_PROVIDERS} from "ng2-material";


// enableProdMode()

bootstrap(MainApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  MATERIAL_PROVIDERS, HttpClient, MessageService,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
.catch(err => console.error(err));
