import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  private source = new Subject<string>();

  get asObservable() {
    return this.source.asObservable();
  }

  upload(file: any) {
    setTimeout(() => this.source.next(file), 800);
  }
}
