import {Component} from 'angular2/core';

@Component({
  selector: 'ib-email-item',
  templateUrl: 'app/inbox/components/inbox-items/email-item-component.html',
  styleUrls: ['app/inbox/components/inbox-items/email-item-component.css'],
  inputs: ['email']
})
export class EmailItem {
  email;

  constructor() {
  }
}

