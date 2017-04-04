import {Component} from '@angular/core';
import {GroupsService} from './groups.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  groups;
  title = 'app works!';

  constructor(groupsService: GroupsService) {
    this.groups = groupsService.getAll();
    console.log(this.groups);
  }
}
