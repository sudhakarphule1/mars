import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";

@Component({
  selector: 'ib-left-nav',
  templateUrl: 'app/share/components/left-navigation.component.html',
  styles: [ require('./left-navigation.component.scss') ],
  providers: [SidenavService],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})

export class LeftNavigation {
  selected : string;

  constructor(public sidenav: SidenavService) {
    this.selected = "Inbox";
  }

  close(name: string) {
    this.sidenav.hide(name);
  }

  select( selected : string){
    this.selected = selected;
  }
}
