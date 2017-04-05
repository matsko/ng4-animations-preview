import { Injectable } from '@angular/core';

@Injectable()
export class PreviewBusService {
  private _callbacks = new Map<any, () => any>();

  constructor() { }

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
