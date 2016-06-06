import {Component, OnChanges, SimpleChange} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {MATERIAL_DIRECTIVES, Media} from "ng2-material";
import {SearchService}     from './search.service';
import {MessageService} from "../services/message.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ib-header',
  templateUrl: 'app/share/components/header.component.html',
  styles: [ require('./header.component.scss') ],
  providers: [],
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class Header {

  private access_token: string = "";
  public displayMessage: boolean = true;
  public message: string = "Sample Error";
  subscription : Subscription;

  constructor(private searchService: SearchService,
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

  logout(){
    localStorage.removeItem("access_token");
    this._router.navigate(['Login']);
  }

}
