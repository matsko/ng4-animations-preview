import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, group, query, style, transition, trigger, wait} from '@angular/animations';
import {GroupsService} from '../groups.service';

import {CardComponent} from '../card';
import {LoaderComponent} from '../loader/loader.component';
import {PreviewBusService} from "../preview-bus.service";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({opacity: 0}),
        query('.container', [
          style({opacity: 0, transform: 'translateX($x) translateY($y) scale(0)', transformOrigin: '$ox $oy'})
        ]),
        group([
          animate('100ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1})),
          query('.container', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))),
        ]),
      ], {x: '0px', y: '0px', ox: '50%', oy: '50%'}),
      transition(':leave', group([
        animate(300, style({opacity: 0})),
        query('.container', [
          animate(300, style({opacity: 0, transform: 'translateX($x) translateY($y) scale(0)'}))
        ])
      ]), {x: '0px', y: '0px', ox: '50%', oy: '50%'})
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ImageModalComponent {
  data = {
    value: 'inactive',
    x: null,
    y: null,
    ox: null,
    oy: null
  };

  _selectedGroup = '_newGroup';

  file;

  @ViewChild(CardComponent)
  public card;

  @ViewChild(LoaderComponent)
  public loader;

  constructor(public groups: GroupsService, private _preview: PreviewBusService) {
  }

  show(event: any, group: any) {
    this._show();
    const clientX = event.clientX;
    const clientY = event.clientY;

    this._selectedGroup = '_newGroup';
    const window = document.body.getBoundingClientRect();
    const wh = window.width / 2;
    const hh = window.height / 2;
    const x = clientX - wh;
    const y = clientY - hh;
    const ox = clientX / window.width;
    const oy = clientY / window.height;
    this.data.x = `${x}px`;
    this.data.y = `${y}px`;
    this.data.ox = `${ox * 100}%`;
    this.data.oy = `${oy * 100}%`;

    if (group) {
      const all = this.groups.getAll();
      this._selectedGroup = all[all.indexOf(group)].title;
    }
  }

  private _show() {
    this.data.value = 'active';
  }

  hide() {
    this.data.value = 'inactive';
  }

  toggle() {
    this.data.value === 'active' ? this.hide() : this._show();
  }

  save(form) {
    this.card.toggle();

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.loader.upload(e.target.result);
    };
    reader.readAsDataURL(this.file);

    this.loader.asObservable.subscribe((result) => {
      const id = this.groups.addImage(form.newGroup || form.group, result);

      this.hide();
      this._preview.openImageById(id);
    });
  }

  onFileChange(event) {
    this.file = event.target.files[0];
  }
}
