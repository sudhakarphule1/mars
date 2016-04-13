import {InboxItem} from './inbox.model';
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'inboxFilter' })
export class InboxFilterPipe implements PipeTransform {
  transform(allItems:InboxItem[], args: any[]) {
    return allItems.filter(item => args[1] === "" || item.search( args[1].toLowerCase() ));
  }
}
