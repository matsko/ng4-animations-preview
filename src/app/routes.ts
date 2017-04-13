import {IndexPageComponent} from "./index-page/index-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";

export const APP_ROUTES = [{
    path: '',
    component: IndexPageComponent,
    data: {
      animation: {
        value: 'home',
      }
    }
  }, {
    path: 'about',
    component: AboutPageComponent,
    data: {
      animation: {
        value: 'about',
      }
    }
  }
];
