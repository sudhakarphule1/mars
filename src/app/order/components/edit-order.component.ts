import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Order} from "../../model/order";

@Component({
  selector: 'or-edit-order',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/order/components/edit-order.component.html',
  styleUrls: ['app/order/components/edit-order.component.css'],
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
