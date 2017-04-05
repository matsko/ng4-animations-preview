import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
  @Input() group;
  @Input() modal;

  selectedImage = null;

  constructor() { }

  selectImage(image: any) {
    this.selectedImage = image === this.selectedImage ? null : image;
  }
}
