import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {Github} from '../../services/github';

@Component({
  selector: 'task-detail',
  templateUrl: 'app/components/task-detail/task-detail.html',
  styleUrls: ['app/components/task-detail/task-detail.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class TaskDetail {
  repoDetails = {};
  constructor(routeParams:RouteParams, github: Github) {
    github.getRepoForOrg(routeParams.get('org'),routeParams.get('name'))
      .subscribe(repoDetails => {
        this.repoDetails = repoDetails;
      });
  }

}
