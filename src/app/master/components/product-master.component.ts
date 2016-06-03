import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import "../../../../node_modules/ng2-material/dist/ng2-material.css";
import "../../../../node_modules/ng2-material/dist/font.css";
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Item} from "../../model/item";
import {ProductService} from "../services/product.service";
import {ProductsFilterPipe} from "../../order/components/products-filter.pipe";

@Component({
  selector: 'ib-product-master',
  templateUrl: 'app/master/components/product-master.component.html',
  styleUrls: [''],
  directives: [ROUTER_DIRECTIVES],
  providers: [ProductService, ProductsFilterPipe],
  pipe: [ProductsFilterPipe]
})

export class ProductMaster {

  items:Array<Item>;
  itemss:Array<Item>;
  productjson = {"_id": "", "name": "", "detail": "", "variant": "", "type": "", "available": "", "unitRate": ""}

  constructor(private products:ProductService) {
    products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });
  }

  onRowClick(event, id, item2) {

    for (var index:number = 0; index < 5; index++) {

      //console.log(event.currentTarget.parentElement.children.item(index).textContent)
      this.productjson._id = id
      if (index == 1) {
        this.productjson.name = event.currentTarget.parentElement.children.item(index).textContent
      }
      if (index == 2) {
        this.productjson.type = event.currentTarget.parentElement.children.item(index).textContent
      }
      if (index == 3) {
        this.productjson.detail = event.currentTarget.parentElement.children.item(index).textContent
      }
      if (index == 4) {
        this.productjson.variant = event.currentTarget.parentElement.children.item(index).textContent
      }
      if (index == 6) {
        this.productjson.unitRate = event.currentTarget.parentElement.children.item(index).textContent
      }

    }

    console.log("hi");
    this.products.updateProduct(this.productjson);

    this.products.getAllProducts()
      .subscribe(res => {
        this.items = res;
      });
  }

}
