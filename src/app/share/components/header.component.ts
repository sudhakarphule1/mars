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

  private access_token: string = "";

  constructor(public sidenav: SidenavService, private searchService: SearchService, private _router: Router)
  {
    this.access_token = localStorage.access_token;
  }

  onSearchChange(value:string){
    this.searchService.applyFilter(value);
  }

  hasMedia(breakSize: string): boolean {
    return true;
  //  return Media.hasMedia(breakSize);
  }
  open(name: string) {
    this.sidenav.show(name);
  }
  
  logout(){
    localStorage.removeItem("access_token");
    this._router.navigate(['Login']);
  }

}
