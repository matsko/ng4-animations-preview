import {HostBinding, Component, Input, Output, EventEmitter} from '@angular/core';
import {trigger, animate, style, transition, animateChild, group, query, stagger} from '@angular/animations';
import {PreviewBusService} from "../preview-bus.service";

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css'],
  animations: [
    trigger('preview', [
      transition(':enter', [
        style({ overflow: 'hidden', height: 0 }),
        query('.image-container', [
          query('*', style({ opacity: 0 }))
        ]),
        group([
          animate('0.5s cubic-bezier(0.35, 0, 0.25, 1)', style({ height: '*' })),
          query('.image-container *', [
            stagger(100, animate(500, style({ opacity: 1 })))
          ])
        ])
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('0.5s cubic-bezier(0.35, 0, 0.25, 1)', style({ height: '0px'}))
      ]),
      transition('* => *', [
        query(':enter, :leave', style({ position: 'absolute', left: '0%' })),
        query(':enter', style({ left: '100%' })),

        group([
          query(':leave', group([
            animateChild(),
            animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity:0, left:'-100%' }))
          ])),

          query(':enter', group([
            animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
            animateChild()
          ]), { delay: 200 }),
        ])
      ])
    ]),
    trigger('image', [
      transition(':enter', [
        query('*', [
          style({ transform: 'translateX(200px)', opacity: 0 }),
          stagger(100, [
            animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
          ])
        ])
      ])
    ])
  ]
})
export class ImagePreviewComponent {
  @Output('close')
  public closeNotify = new EventEmitter();
  public activeImages: any[] = [];

  @Input('image')
  set image(img: any) {
    this.activeImages = [];
    if (img && this.activeImages[0] != img) {
      this.activeImages.push(img);
      this.count++;
      this._previewService.notifyOpen(this);
    }
  }

  @HostBinding('@preview')
  public count: number = 0;

  constructor(private _previewService: PreviewBusService) {
    _previewService.onOtherPreviewOpen(this, () => this.close());
  }

  close() {
    this.closeNotify.next();
  }
}
