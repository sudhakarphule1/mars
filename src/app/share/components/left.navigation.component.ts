import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";

@Component({
  selector: 'ib-left-nav',
  templateUrl: 'app/share/components/left-navigation.component.html',
  styleUrls: ['app/share/components/left-navigation.component.css'],
  providers: [SidenavService],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})

export class LeftNavigation {
  selected : string;

  constructor(public sidenav: SidenavService) {
  }
  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }
  open(name: string) {
    this.sidenav.show(name);
  }
  close(name: string) {
    this.sidenav.hide(name);
  }

  clicked(message: string) {
    alert(message);
  }

  select( selected : string){
    this.selected = selected;
  }
}
