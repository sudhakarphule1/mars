import {Component, Input, Output, EventEmitter} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {MATERIAL_DIRECTIVES} from "ng2-material";
import {Order} from "../../model/order";

@Component({
  selector: 'or-edit-order',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/edit-order.component.html',
  styles: [ require('./common.scss') ],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class EditOrder {

  @Input() currentOrder: Order;
  private edit: boolean = false;

  constructor() {
  }

  removeItem(item){
    var index = this.currentOrder.items.indexOf(item);
    this.currentOrder.items.splice(index, 1);
    if(this.currentOrder.items.length == 0){
        /*this.edit = false;*/
    }
  }

}
