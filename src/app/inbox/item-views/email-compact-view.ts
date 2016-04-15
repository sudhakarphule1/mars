import {Component} from 'angular2/core';

@Component({
  selector: 'ib-email-compact-view',
  templateUrl: 'app/inbox/item-views/email-compact-view.html',
  styleUrls: ['app/inbox/item-views/email-compact-view.css'],
  inputs: ['email']
})
export class EmailCompactView {
  email;
  isPending = true;
  isInProgress = false;
  isComplete = false;

  constructor() {
  }
}

