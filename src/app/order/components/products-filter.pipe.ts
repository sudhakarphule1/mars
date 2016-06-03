/**
 * Created by chetan on 28/4/16.
 */
import {Pipe, PipeTransform} from 'angular2/core';
import {Item} from "../../model/item";

@Pipe({name: 'productsFilter'})
export class ProductsFilterPipe implements PipeTransform {
  transform(allItems:Item[], args:any[]) {
    if (allItems) {
      return allItems.filter(item => args[1].toLowerCase() === ""
      || item.name.toLowerCase().search(args[1].toLowerCase()) !== -1
      || item.type.toLowerCase().search(args[1].toLowerCase()) !== -1
      || item.detail.toLowerCase().search(args[1].toLowerCase()) !== -1
      || item.unit.toLowerCase().search(args[1].toLowerCase()) !== -1)
    }
    else {
      return allItems;
    }
  }
}
