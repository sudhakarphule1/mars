import {DataProvider} from "./data-provider";
import {AudioContent} from "../inbox.model";

export class AudioDataProvider implements DataProvider {
  constructor() {
  }

  getAll() {
    var audioContent = new AudioContent();
    audioContent.from = 'admin.clerk@hsbc.com';
    audioContent.date = new Date();
    audioContent.subject = 'Mrx Joshi from HSBC called me';
    audioContent.attachment = 'Attachment 1 TODO';

    var items:Array<any>;
    items = new Array<AudioContent>();
    items.push(audioContent)
    return items;
  }
}
