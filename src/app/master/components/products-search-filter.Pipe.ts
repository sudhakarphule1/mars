/**
 * Created by Twinprimelabs on 14/06/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../../model/item";

@Pipe({name: 'productSearchFilter'})
export class ProductSearchFilterPipe implements PipeTransform {
  transform(allItems:Item[], args:any) {
    if (allItems) {
      return allItems.filter(item => args.toLowerCase() === ""
        || item.name.toLowerCase().search(args.toLowerCase()) !== -1
        || item.type.toLowerCase().search(args.toLowerCase()) !== -1
        || item.detail.toLowerCase().search(args.toLowerCase()) !== -1
        /*|| item.unitRate search(args[1]) !== -1*/)
    }
    else {
      return allItems;
    }
  }
}
