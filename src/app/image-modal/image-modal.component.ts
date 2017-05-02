import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {GroupsService} from '../groups.service';

import {CardComponent} from '../card';
import {LoaderComponent} from '../loader/loader.component';
import {PreviewBusService} from "../preview-bus.service";
import {Subscription} from 'rxjs';

const zoomFadeIn = {opacity: 0, transform: 'translateX({{ x }}) translateY({{ y }}) scale(0)'};
const zoomFadeInFrom = {...zoomFadeIn, transformOrigin: '{{ ox }} {{ oy }}'};
const easeInFor = (duration) => `${duration}ms cubic-bezier(0.35, 0, 0.25, 1)`;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({opacity: 0}),
        query('.container', [ style(zoomFadeInFrom) ]),
        group([
          animate(easeInFor(100), style({opacity: 1})),
          query('.container', animate(easeInFor(300), style('*'))),
        ]),
      ], { params: {x: '0px', y: '0px', ox: '50%', oy: '50%'}}),
      transition(':leave', group([
        animate(300, style({opacity: 0})),
        query('.container', [
          animate(300, style(zoomFadeIn))
        ])
      ]), { params: {x: '0px', y: '0px', ox: '50%', oy: '50%'}})
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ImageModalComponent {
  @ViewChild(CardComponent)
  public card;

  @ViewChild(LoaderComponent)
  public loader;
  public _selectedGroup = '_newGroup';
  public file;
  public data = {
    value: 'inactive',
    params: {
      x: null,
      y: null,
      ox: null,
      oy: null
    }
  };

  constructor(public groups: GroupsService, private _preview: PreviewBusService) { }


  /**
   * This component initializes with hidden DOM
   */
  show(event: any, group: any) {
    this.calculateZoomOrigin(event);
    this.makeVisible();

    this._selectedGroup = '_newGroup';
    if (group) {
      const all = this.groups.getAll();
      this._selectedGroup = all[all.indexOf(group)].title;
    }
  }

  /**
   * Calculate origin used in the `zoomFadeInFrom()`
   */
  private calculateZoomOrigin(event) {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const window = document.body.getBoundingClientRect();
    const wh = window.width / 2;
    const hh = window.height / 2;
    const x = clientX - wh;
    const y = clientY - hh;
    const ox = clientX / window.width;
    const oy = clientY / window.height;

    this.data.params.x = `${x}px`;
    this.data.params.y = `${y}px`;
    this.data.params.ox = `${ox * 100}%`;
    this.data.params.oy = `${oy * 100}%`;
  }

  private makeVisible() {
    this.data.value = 'active';
  }

  hide() {
    this.data.value = 'inactive';
  }

  toggle() {
    this.data.value === 'active' ? this.hide() : this.makeVisible();
  }

  /**
   * When a file is selected (to upload), flip the card
   * to show the upload status view. And while simulating an
   * image upload, show a progress bar (in the upload status view).
   *
   * When upload finishes, hide this ImageModalComponent view
   * and select/show the uploaded image in the Image group.
   */
  save(form) {
    let subscription: Subscription;
    const showUploadedImage = (result) => {
      const id = this.groups.addImage(form.newGroup || form.group, result);
      this.hide();
      this._preview.openImageById(id);
      subscription.unsubscribe();
    };

    this.card.toggle();
    subscription = this.loader.asObservable.subscribe(showUploadedImage);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.loader.upload(e.target.result);
    };
    reader.readAsDataURL(this.file);
  }

  onFileChange(event) {
    this.file = event.target.files[0];
  }
}
