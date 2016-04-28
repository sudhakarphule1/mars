import {Pipe, PipeTransform} from 'angular2/core';
import {InboxItem} from "../model/inbox-item";

@Pipe({ name: 'inboxFilter' })
export class InboxFilterPipe implements PipeTransform {
  transform(allItems:InboxItem[], args: any[]) {
    if (allItems){
      return allItems.filter(item => args[1] === "" || item.search( args[1].toLowerCase() ));
    }
    else {
      return allItems;
    }
  }
}
