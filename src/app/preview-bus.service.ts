import { Injectable } from '@angular/core';
import {GroupsService} from "./groups.service";

@Injectable()
export class PreviewBusService {
  public groupsByName = new Map<string, any>();
  private _callbacks = new Map<any, () => any>();

  constructor(private _groups: GroupsService) { }

  openImageById(id: number) {
    const groups = this._groups.getAll();
    let data: any;
    outer:
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      for (let j = 0; j < group.images.length; j++) {
        const record = group.images[j];
        if (record.id == id) {
          data = [group, record];
          break outer;
        }
      }
    }

    if (!data) return;

    const [group, record] = data;
    const component = this.groupsByName.get(group.title);
    component.selectImage(record);
  }

  register(name: any, component: any) {
    this.groupsByName.set(name, component);
  }

  onOtherPreviewOpen(previewComponent: any, cb: () => any) {
    this._callbacks.set(previewComponent, cb);
  }

  notifyOpen(previewComponent: any) {
    Promise.resolve().then(() => {
      this._callbacks.forEach((cb, cmp) => {
        if (previewComponent !== cmp) {
          cb();
        }
      });
    });
  }
}
