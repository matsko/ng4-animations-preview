import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    card { 
      display:inline-block;
      width:200px;
      height:300px;
      border:10px solid black;
    }
  `]
})
export class AppComponent {
  title = 'app works!';

  public timing = '500ms ease-out';
}
