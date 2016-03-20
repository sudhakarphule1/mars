import {Component} from 'angular2/core';

@Component({
  selector: 'ib-audio-compact-view',
  inputs: ['audioContent'],
  templateUrl: 'app/inbox/item-views/audio-compact-view.html',
  styleUrls: ['app/inbox/item-views/audio-compact-view.css']
})
export class AudioCompactView {
  audioContent;

  constructor() {
  }
}

