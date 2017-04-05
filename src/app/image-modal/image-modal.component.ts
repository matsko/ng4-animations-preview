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
          animate('100ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1})),
          query('.container', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))),
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

  show(event: any) {
    this._show();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const window = document.body.getBoundingClientRect();
    const wh = window.width / 2;
    const hh = window.height / 2;
    const x = clientX - wh;
    const y = clientY - hh;
    const ox = clientX / window.width;
    const oy = clientY / window.height;
    this.data.x = `${x}px`;
    this.data.y = `${y}px`;
    this.data.ox = `${ox * 100}%`;
    this.data.oy = `${oy * 100}%`;
    console.log(this.data);
  }

  private _show() {
    this.data.value = 'active';
  }

  hide() {
    this.data.value = 'inactive';
  }

  toggle() {
    this.data.value === 'active' ? this.hide() : this._show();
  }

  constructor() {
  }

  ngOnInit() {
  }

}
