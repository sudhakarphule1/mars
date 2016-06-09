import {Component, Input} from '@angular/core';


@Component({
  selector: 'ib-audio-compact-view',
  inputs: ['audioContent'],
  templateUrl: 'app/inbox/item-views/audio-compact-view.html',
  styles: [ require('./inbox.component.scss') ],
})
export class AudioCompactView {
  @Input() audioContent;
  @Input() selected:string;

  constructor() {
  }
}

