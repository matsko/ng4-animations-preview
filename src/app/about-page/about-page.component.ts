import {Component} from '@angular/core';
import {CONTRIBUTORS} from './contributors/contributors';
import {trigger} from '@angular/animations';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  animations: [
    trigger('test', [])
  ]
})
export class AboutPageComponent {
  authors = CONTRIBUTORS.primary;
  contributors = CONTRIBUTORS.secondary;

  constructor() {
  }
}
