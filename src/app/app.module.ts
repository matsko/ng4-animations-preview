import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { GroupsService } from './groups.service';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { ImageComponent } from './image/image.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {APP_ROUTES} from "./routes";

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    ImageComponent,
    ImageModalComponent,
    IndexPageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [GroupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
