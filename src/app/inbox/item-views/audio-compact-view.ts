import {Component} from 'angular2/core';

@Component({
  selector: 'ib-audio-compact-view',
  templateUrl: 'app/inbox/item-views/audio-compact-view.html',
  styleUrls: ['app/inbox/item-views/audio-compact-view.css'],
  inputs: ['audioContent']
})
export class AudioCompactView {
  audioContent;

  constructor() {
  }
}

