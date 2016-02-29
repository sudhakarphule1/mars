import {Component} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import "../../../../node_modules/ng2-material/dist/ng2-material.css";
import "../../../../node_modules/ng2-material/dist/font.css";

@Component({
  selector: 'task-list',
  templateUrl: 'app/components/task-list/task-list.html',
  styleUrls: ['app/components/task-list/task-list.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class TaskList {
  repos: Observable<any>
  constructor(github: Github, params:RouteParams) {
    this.repos = github.getReposForOrg(params.get('org'));
  }
}
