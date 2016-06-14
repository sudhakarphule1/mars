import {Component} from '@angular/core';
import {Item} from "../../model/item";
import {ProductService} from "../services/product.service";
import {ProductSortingFilter} from "./products-sort-filter.pipe";
import {ProductSearchFilterPipe} from "./products-search-filter.Pipe";
import {moveCursor} from "readline";

@Component({
  selector: 'ib-product-master',
  templateUrl: 'app/master/components/product-master.component.html',
  providers: [ProductService],
  styles: [`
  .empty{
        border: 3px solid #F00;
  }

   input:focus {
        word-wrap: break-word;
   }
`],
  pipes: [ProductSearchFilterPipe,ProductSortingFilter]
})

export class ProductMaster {
  entityname:string = '';
  isInputFieldEmpty = false;
  myCurrentid:any;
  items:Array<Item>;
  sortBy : string = "name";
  isVisibleDeleteButton:Array<Boolean> = new Array<Boolean>();

  constructor(private products:ProductService) {

    products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });

  }

  setDeleteButtonValue(itemindex) {
    this.isVisibleDeleteButton[itemindex] = false;
    for (var index:number = 0; index < this.items.length; index++) {
      if (index != itemindex) {
        this.isVisibleDeleteButton[index] = true;
      }
    }
  }

  handleKeyEvent(event) {
    console.log(event.keyCode);

    if (event.keyCode == 37) {
      console.log(event);debugger
      event.target.previousElementSibling.focus();
    }

    if (event.keyCode == 38) {
      console.log(event);
      event.target.nextElementSibling.focus();
    }

    if (event.keyCode == 39) {debugger
      console.log(event);
      //var k =event.target.value.length;
        event.target.nextElementSibling.focus();

    }

    if (event.keyCode == 40) {
      console.log(event);
      event.target.nextElementSibling.focus();

    }
  }

  deleteRow(deleteItem) {
    this.products.deleteProduct(deleteItem).subscribe();
    this.products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });
  }

  onRowClick(updateItem, elementName) {
    if (elementName.length != 0) {
      this.products.updateProduct(updateItem).subscribe(res => {
        console.log("res" + res);
        this.items = res;
      });
    }
    else {
      this.myCurrentid = updateItem._id;
      this.isInputFieldEmpty = true;
    }
  }
  sortby(sortByMe){
    this.sortBy=sortByMe;
  }

}
