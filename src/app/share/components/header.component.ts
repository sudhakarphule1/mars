import {Component, OnChanges, SimpleChange} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";
import {SearchService}     from './search.service';

@Component({
  selector: 'ib-header',
  templateUrl: 'app/share/components/header.component.html',
  styleUrls: ['app/share/components/header.component.css'],
  providers: [SidenavService/*, SearchService*/],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class Header {

  constructor(public sidenav: SidenavService, private searchService: SearchService, private _router: Router)
  {

  }

  onSearchChange(value:string){
    this.searchService.applyFilter(value);
  }

  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }
  open(name: string) {
    this.sidenav.show(name);
  }

}
