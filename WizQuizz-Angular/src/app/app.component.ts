import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <!-- header -->
        <app-header></app-header>
        <!-- routing process -->
        <router-outlet></router-outlet>
        <!-- footer -->
        <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'WizQuizz-Angular';
}
