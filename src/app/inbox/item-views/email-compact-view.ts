import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TimeAgoPipe} from "angular2-moment/TimeAgoPipe";
import {LeftNavigation} from "./../../share/components/left.navigation.component";

@Component({
  selector: 'ib-email-compact-view',
  templateUrl: 'app/inbox/item-views/email-compact-view.html',
  styleUrls: ['app/inbox/item-views/email-compact-view.css'],
  directives: [MATERIAL_DIRECTIVES, LeftNavigation],
  pipes: [TimeAgoPipe],
  inputs: ['email','isDisabled']
})
export class EmailCompactView {
  email;
  isPending = true;
  isInProgress = false;
  isComplete = false;
  showDetails = false;

  isOn = false;
  isDisabled = false;
  toggle(newState) {
    if (!this.isDisabled) {
      this.isOn = newState;
    }
  }

  constructor() {
  }

}
