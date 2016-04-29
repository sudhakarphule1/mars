import {Component} from 'angular2/core';


@Component({
  selector: 'ib-audio-compact-view',
  inputs: ['audioContent'],
  templateUrl: 'app/inbox/item-views/audio-compact-view.html',
  styles: [ require('./list-view.scss') ],
})
export class AudioCompactView {
  audioContent;
  isPending = true;
  isInProgress = false;
  isComplete = false;

  constructor() {
  }
}

