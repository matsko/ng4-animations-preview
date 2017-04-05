import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../groups.service";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent {
  public groups;

  constructor(groupsService: GroupsService) {
    this.groups = groupsService.getAll();
  }
}
