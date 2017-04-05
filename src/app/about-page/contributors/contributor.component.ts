import {Component, Input} from '@angular/core';

@Component({
  selector: 'contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent {

  @Input() info: any;

}
