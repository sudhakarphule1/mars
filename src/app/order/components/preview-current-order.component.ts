import {Component, Input} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {Order} from "../../model/order";

@Component({
  selector: 'or-preview-current-order',
  templateUrl: 'app/order/components/preview-current-order.component.html',
  styles: [ require('./common.scss') ],
  providers: [],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES],
})

export class PreviewCurrentItems{

  @Input() currentOrder: Order;
  constructor() {
  }
}
