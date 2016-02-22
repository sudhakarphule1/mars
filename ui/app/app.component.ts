import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

let imagePath = 'public/images/avatars/avatar11.svg';


@Component({
    selector: 'my-app'
})
@View({
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
phones = [
    {type: 'Home', number: '(555) 251-1234'},
    {type: 'Cell', number: '(555) 786-9841'},
    {type: 'Office', number: '(555) 314-1592'}
  ];
  todos = [
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
  ];
}