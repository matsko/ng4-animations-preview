import {Component, HostBinding} from '@angular/core';
import {CONTRIBUTORS} from './contributors/contributors';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  animations: [
    trigger('pageAnimation', [
      transition(':leave', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AboutPageComponent {
  authors = CONTRIBUTORS.primary;
  contributors = CONTRIBUTORS.secondary;

  @HostBinding('@pageAnimation')
  public doAnimate = true;

  constructor() {
  }
}
