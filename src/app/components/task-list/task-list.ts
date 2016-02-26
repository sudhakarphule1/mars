import {Component} from 'angular2/core';
import {Github} from '../../services/github';
import {Observable} from 'rxjs/Observable';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

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
