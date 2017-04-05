import {style, animate, sequence, AnimationBuilder, AnimationPlayer} from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  private source = new Subject<string>();
  public percentage: number = 0;

  @ViewChild('loadingBar')
  public loadingBar;

  constructor(private _builder: AnimationBuilder) {

  }

  getPercentage() {
    return Math.ceil(this.percentage * 100);
  }

  animateTo(to: number) {
    const loaderAnimation = this._builder.build(sequence([
      style({ width: '*' }),
      animate('350ms cubic-bezier(.35, 0, .25, 1)', style({ width: (to * 100) + '%' }))
    ]));

    return loaderAnimation.create(this.loadingBar.nativeElement, {});
  }

  get asObservable() {
    return this.source.asObservable();
  }

  upload(file: any) {
    this.percentage = 0;
    this.animateLoop(() => {
      this.source.next(file);
    });
  }

  animateLoop(cb: Function) {
    if (this.percentage >= 1) {
      cb();
      return;
    }
    const player = this.animateTo(this.percentage);
    player.onDone(() => {
      this.percentage += rand(0.03, 0.08);
      this.animateLoop(cb);
    });
    player.play();
  }
}

function rand(min: number, max: number): number {
  return (Math.random() * max) + min;
}
