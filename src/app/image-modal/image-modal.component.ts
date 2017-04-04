import {Component, OnInit} from '@angular/core';
import {animate, group, query, style, transition, trigger, wait} from '@angular/animations';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({opacity: 0}),
        query('.container', [
          style({opacity: 0, transform: 'translateX($x) translateY($y) scale(0)', transformOrigin: '$ox $oy'})
        ]),
        group([
          animate(300, style({opacity: 1})),
          query('.container', animate(200, style('*'))),
        ]),
      ], {x: '0px', y: '0px', ox: '50%', oy: '50%' }),
      transition(':leave', group([
        animate(300, style({opacity: 0})),
        query('.container', [
          animate(300, style({opacity: 0, transform: 'translateX($x) translateY($y) scale(0)'}))
        ])
      ]), {x: '0px', y: '0px', ox: '50%', oy: '50%' })
    ])
  ]
})
export class ImageModalComponent implements OnInit {
  data = {
    value: 'inactive',
    x: null,
    y: null,
    ox: null,
    oy: null
  };

  show(elem: any = null) {
    this.data.value = 'active';
    const rect = elem.getBoundingClientRect();
    const window = document.body.getBoundingClientRect();
    const wh = window.width / 2;
    const hh = window.height / 2;
    const x = rect.left - wh;
    const y = rect.top - hh;
    const ox = wh / x;
    const oy = wh / y;
    this.data.x = `${x}px`;
    this.data.y = `${y}px`;
    this.data.ox = `${ox}px`;
    this.data.oy = `${oy}px`;
  }

  hide() {
    this.data.value = 'inactive';
  }

  toggle() {
    this.data.value === 'active' ? this.hide() : this.show();
  }

  constructor() {
  }

  ngOnInit() {
  }

}
