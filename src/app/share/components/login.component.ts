import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Route, RouteConfig} from 'angular2/router';
import {Router} from "angular2/router";

import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {SharedServices} from "../../order/services/shared.service.ts";
import {Inbox} from "../../inbox/inbox.component.ts";

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS, SharedServices],
  templateUrl: 'app/share/components/login.component.html',
  styleUrls: ['app/share/components/login.component.scss'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class Login {

  displayError = false;
  errorMessage: string = "";
  userName: string = "";
  password: string = "";

  constructor(private _router: Router,private sharedServices: SharedServices) {
  }

  submitForm(){
    this.sharedServices.userLogin({firstName:this.userName, password:this.password}).
    subscribe(res => {
        localStorage.setItem("access_token", res.json().access_token);
        this._router.navigate(['Inbox']);
      }
    );
  }
}
