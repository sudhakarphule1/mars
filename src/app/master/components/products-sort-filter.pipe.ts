/**
 * Created by Twinprimelabs on 14/06/16.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../../model/item";

@Pipe({name:'productsSortFilter'})

export class ProductSortingFilter implements PipeTransform {
  
  transform(array:Item[], args:any):Item[] {
    if (array==undefined){
      return array;
    }

    switch (args){

      case "name" :
        console.log(args);
        array.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;

      case "type" :
        console.log(args);
        array.sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          } else if (a.type > b.type) {
            return 1;
          } else {
            return 0;
          }
        });
        break;

      case "detail" :
        console.log(args);
        array.sort((a, b) => {
          if (a.detail < b.detail) {
            return -1;
          } else if (a.detail > b.detail) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      
      /*case "variant" :
        console.log(args);
        array.sort((a, b) => {
          if (a.variant < b.variant) {
            return -1;
          } else if (a.variant > b.variant) {
            return 1;
          } else {
            return 0;
          }
        });
        break;*/

      case "unit" :
        console.log(args);
        array.sort((a, b) => {
          if (a.unit < b.unit) {
            return -1;
          } else if (a.unit > b.unit) {
            return 1;
          } else {
            return 0;
          }
        });
        break;

      case "price" :
        array.sort((a, b) => {
          if (a.unitRate < b.unitRate) {
            return -1;
          } else if (a.unitRate > b.unitRate) {
            return 1;
          } else {
            return 0;
          }
        });
        break;

      /*case "vat" :
        array.sort((a, b) => {
          if (a.vat < b.vat) {
            return -1;
          } else if (a.vat > b.vat) {
            return 1;
          } else {
            return 0;
          }
        });
        break;*/

      default :
        console.log(args);
            break;

    }
    return array;
  }
}
