import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'card',
  template: `
    <div class="wrapper" [@flip]="data">
      <div class="front" *ngIf="data.value === 'front'">
        <ng-content select=".front"></ng-content> 
      </div>
      <div class="back" *ngIf="data.value === 'back'">
        <ng-content select=".back"></ng-content> 
      </div>
    </div>
  `,
  styles: [`
    :host { perspective: '1000px'; }
    .wrapper {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      position: relative;
    }
    .front, .back {
      backface-visibility: hidden;
    	position: absolute;
	    top: 0;
	    left: 0;
      display: flex;
      flex-direction: column;
    }
    .front {
      z-index: 2;
      transform: rotateY(0deg);
    }
    .back {
      transform: rotateY(180deg);
    }
  `],
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0deg)',
      })),
      state('back', style({
        transform: 'rotateY(180deg)',
      })),
      transition('back <=> front', [
        animate('{{ time }}')
      ], { params: { time: '500ms' } })
    ])
  ]
})
export class CardComponent {
  public data = { value: 'front', time: null };

  @Input('timing')
  public timing: string;

  public toggle() {
    this.data = {
      value: this.data.value === 'front' ? 'back' : 'front',
      time: this.timing || '1000ms'
    };
  }
}
