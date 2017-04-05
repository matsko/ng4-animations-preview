import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ModalServiceService} from "./modal-service.service";
import {trigger, animate, style, query, queryAll, stagger, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routerAnimations', [
      transition(':enter, :leave', []),
      transition('* => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
        query(':enter', [
          style({ opacity: 0 })
        ]),
        query(':leave', [
          animate(1000, style({ opacity: 0 }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  @ViewChild('modal')
  public modal;

  constructor(private _modalService: ModalServiceService) {}

  ngOnInit() {
    this._modalService.setModal(this.modal);
  }

  prepareRouteTransition(outlet) {
    let routeData: any;
    try {
      routeData = outlet['_activatedRoute'].snapshot.routeConfig['animation'];
    } catch(e) {
      return 'firstPage';
    }
    return routeData;
  }
}
