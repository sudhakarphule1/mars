import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Router} from "angular2/router";

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/share/components/login.component.html',
  styleUrls: ['app/share/components/login.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class Login {

  displayError = false;
  errorMessage: string = "";

  constructor(private _router: Router) {
  }

  submitForm(){


  }
}
