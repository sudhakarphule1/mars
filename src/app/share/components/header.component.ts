import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";

@Component({
  selector: 'ib-header',
  templateUrl: 'app/share/components/header.component.html',
  styleUrls: ['app/share/components/header.component.css'],
  providers: [SidenavService],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class Header {
  constructor(public sidenav: SidenavService) {
  }

  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }
  open(name: string) {
    this.sidenav.show(name);
  }
}
