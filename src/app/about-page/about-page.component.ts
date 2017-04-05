import {Component} from '@angular/core';
import {CONTRIBUTORS} from './contributors/contributors';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {
  authors = CONTRIBUTORS.primary;
  contributors = CONTRIBUTORS.secondary;

  constructor() {
  }
}
