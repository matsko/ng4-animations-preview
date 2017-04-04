import {Component, HostBinding, Input} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'card',
  template: `
    <div class="container">
      <div class="front">
        <ng-content select=".front"></ng-content> 
      </div>
      <div class="back">
        <ng-content select=".back"></ng-content> 
      </div>
    </div>
  `,
  styles: [`
    :host { perspective: '1000px'; }
    .container {
      transform-style: preserve-3d;
      position: relative;
    }
    .front, .back {
      backface-visibility: hidden;
    	position: absolute;
	    top: 0;
	    left: 0;
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
        animate('$time')
      ], { time: '500ms' })
    ])
  ]
})
export class CardComponent {
  @HostBinding('@flip')
  public data = { value: 'front', time: null };
  
  @Input('timing')
  public timing: string;

  public toggle(time = null) {
    this.data = {
      value: this.data.value == 'front' ? 'back' : 'front',
      time: this.timing
    };
  }
}
