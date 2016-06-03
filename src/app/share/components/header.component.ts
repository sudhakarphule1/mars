import {Component, OnChanges, SimpleChange} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from "ng2-material/all";
import {SearchService}     from './search.service';
import {MessageService} from "../services/message.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ib-header',
  templateUrl: 'app/share/components/header.component.html',
  styles: [ require('./header.component.scss') ],
  providers: [SidenavService/*, SearchService*/],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class Header {

  private access_token: string = "";
  public displayMessage: boolean = true;
  public message: string = "Sample Error";
  subscription : Subscription;

  constructor(public sidenav: SidenavService,
              private searchService: SearchService,
              private messageService: MessageService,
              private _router: Router)
  {
    this.subscription =  messageService.showMessage$.subscribe(
      message => {
        this.displayMessage = false;
        this.message = message;
      }
    );
  }

  closeMessage(){
    this.displayMessage = true;
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
