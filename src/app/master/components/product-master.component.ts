import {Component} from '@angular/core';
//import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Item} from "../../model/item";
import {ProductService} from "../services/productmaster.service";
import {ProductsFilterPipe} from "../../order/components/products-filter.pipe";

@Component({
  selector: 'ib-product-master',
  templateUrl: 'app/master/components/product-master.component.html',
  providers: [ProductService],
  styles:[`
  .empty{
  border: 3px solid #F00;
  }

input:focus {
  height: 50px;
  width: 11em;
  word-wrap: break-word;
}
`],
  pipes:[ProductsFilterPipe]
})

export class ProductMaster {
  //public buttonMode = true;
  entityname:string = '';debugger
  isempty = false;
  myid:any;
  items:Array<Item>;
  isVisibleDeleteButton: Array<Boolean> =new Array<Boolean>();
  constructor(private products:ProductService) {

    products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });
  }

  setDeleteButtonValue(itemindex) {
    //this.buttonMode = !this.buttonMode;
    this.isVisibleDeleteButton[itemindex] = false;
    for(var index : number = 0; index < this.items.length;index++){
      if(index != itemindex){
        this.isVisibleDeleteButton[index] = true;
      }
    }
  }

  handleKeyEvent(event) {
    console.log(event.keyCode);

    if (event.keyCode == 37) {

    }

    if (event.keyCode == 38) {

    }

    if (event.keyCode == 39) {

    }

    if (event.keyCode == 40) {

    }
  }

  deleteRow(deleteItem) {
    this.products.deleteProduct(deleteItem).subscribe();
    this.products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });
  }

  onRowClick(updateItem,elementName) {
    if(elementName.length != 0) {
      this.products.updateProduct(updateItem).subscribe(res => {
        console.log("res" + res);
        this.items = res;
      });
    }
    else{
      this.myid=updateItem._id;
      this.isempty=true;
    }
  }

}
