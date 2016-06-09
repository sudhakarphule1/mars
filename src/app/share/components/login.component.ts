import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {SharedServices} from "../../order/services/shared.service.ts";
import {Inbox} from "../../inbox/inbox.component.ts";

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS, SharedServices],
  templateUrl: 'app/share/components/login.component.html',
  styles: [ require('./login.component.scss') ],
  directives: [ROUTER_DIRECTIVES]
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
      localStorage.getItem("access_token");
        this._router.navigate(['Inbox']);
      }
    );
  }
}
