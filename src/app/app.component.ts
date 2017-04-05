import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ModalServiceService} from "./modal-service.service";
import {trigger, animate, wait, style, group, query, animateChild, queryAll, stagger, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routerAnimations', [
      transition(':enter, :leave', []),
      transition('home => about', [
        group([
            queryAll('app-index-page, app-about-page', [
              style({ position: 'absolute', top: 0, left: 0, right: 0 })
            ]),
            query('app-about-page', [
              style({ opacity:0, transform: 'translateX(100%)'})
            ]),
          queryAll('app-about-page contributor', [
            style({ opacity:0, transform: 'scale(0)'})
          ]),
        ]),
        group([
          query('app-index-page', [
            queryAll('app-index-page .image', [
              stagger(50, [
                animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translateY(-50px)' }))
              ])
            ]),
            animate('800ms cubic-bezier(.35,0,.25,1)', style({ opacity:0, transform: 'translateX(-100%)' }))
          ]),
          wait(1500, group([
              query('app-about-page', [
                animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
              ]),
            wait(500,[
            queryAll('app-about-page contributor', [
              stagger(200, [
                animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
                ])
              ])
            ])
            ]))
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
      return '';
    }
    return routeData.value;
  }
}
