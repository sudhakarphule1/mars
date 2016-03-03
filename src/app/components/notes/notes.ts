import {Component} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'notes',
  templateUrl: 'app/components/notes/notes.html',
  styleUrls: ['app/components/notes/notes.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Notes {

}
