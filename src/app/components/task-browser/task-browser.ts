import {Component} from 'angular2/core';
import {Router, RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router';

import {TaskList} from '../task-list/task-list';
import {TaskDetail} from '../task-detail/task-detail';
import {Github} from '../../services/github';

@Component({
  selector: 'task-browser',
  templateUrl: 'app/components/task-browser/task-browser.html',
  styleUrls: ['app/components/task-browser/task-browser.css'],
  providers: [Github],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
	new Route({path: '/:org', component: TaskList, name: 'TaskList'}),
	new Route({path: '/:org/:name', component: TaskDetail, name: 'TaskDetail' })
])
export class TaskBrowser {

  constructor(private router:Router, private github: Github) {}

  searchForOrg(orgName: string){
    this.github.getOrg(orgName)
      .subscribe(({name}) => {
        console.log(name);
        this.router.navigate(['TaskList', {org: orgName}])
      })
  }

}
