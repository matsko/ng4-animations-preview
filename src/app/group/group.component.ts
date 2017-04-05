import {Component, Input} from '@angular/core';
import {ModalServiceService} from "../modal-service.service";
import {PreviewBusService} from "../preview-bus.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
  @Input() public group;

  selectedImage = null;

  constructor(private _modalService: ModalServiceService, private _previewService: PreviewBusService) {}

  ngOnInit() {
    this._previewService.register(this.group.title, this);
  }

  selectImage(image: any) {
    this.selectedImage = image === this.selectedImage ? null : image;
  }

  get modal() {
    return this._modalService.getModal();
  }
}
