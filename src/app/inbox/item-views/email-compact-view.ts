import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'ib-email-compact-view',
  templateUrl: 'app/inbox/item-views/email-compact-view.html',
  styleUrls: ['app/inbox/item-views/email-compact-view.css'],
  directives: [MATERIAL_DIRECTIVES],
  inputs: ['email']
})
export class EmailCompactView {
  email;
  isPending = true;
  isInProgress = false;
  isComplete = false;
  showDetails = false;
  constructor() {
  }

}

