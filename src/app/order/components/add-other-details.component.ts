
import {Component} from 'angular2/core';

import {HTTP_PROVIDERS}    from 'angular2/http';
/*import {OrdersDataProvider} from "./inbox/data-providers/orders-data-provider";
 import {AudioDataProvider} from "./inbox/data-providers/audio-data-provider";
 import {EmailDataProvider} from "./inbox/data-providers/email-data-provider";*/
import {MATERIAL_DIRECTIVES, Media} from "ng2-material/all";
/*import {SearchService} from './share/components/search.service';*/

@Component({
  selector: 'inbox-app',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/inbox-app.html',
  styleUrls: ['app/inbox-app.css'],
  directives: [MATERIAL_DIRECTIVES],
  pipes: []
})

export class AddOtherDetails {

}
