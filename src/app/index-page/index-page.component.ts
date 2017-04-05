import {queryAll, stagger, wait, animate, style, transition, trigger} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import {GroupsService} from "../groups.service";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
  animations: [
    trigger('page', [
      transition(':enter', [
        queryAll('.group .image, .group .upload-area', style({ transform: 'translateY(-50px)', opacity: 0})),
        wait(1000),
        queryAll('.group', [
          stagger(300, [
            queryAll('.group .image, .group .upload-area', [
              stagger(100, [
                animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
              ])
            ])
          ])
        ])
      ]),
      transition(':leave', [
        animate(2000, style({ fontSize: '1em' })),
      ])
    ])
  ]
})
export class IndexPageComponent {
  public groups;

  @HostBinding('@page')
  public animatePage = true;

  constructor(groupsService: GroupsService) {
    this.groups = groupsService.getAll();
  }
}
