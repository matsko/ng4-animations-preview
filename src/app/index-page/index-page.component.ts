import {query, stagger, animate, style, transition, trigger} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import {GroupsService} from "../groups.service";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        query('.group .image, .group .upload-area', style({ transform: 'translateY(-50px)', opacity: 0})),
        query('.group', [
          stagger(300, [
            query('.image, .upload-area', [
              stagger(100, [
                animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
              ])
            ])
          ])
        ])
      ]),
    ])
  ]
})
export class IndexPageComponent {
  public groups;

  @HostBinding('@pageAnimation')
  public animatePage = true;

  constructor(groupsService: GroupsService) {
    this.groups = groupsService.getAll();
  }
}
