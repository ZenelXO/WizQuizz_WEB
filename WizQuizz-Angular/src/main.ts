import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

let loader: HTMLElement | null = document.querySelector('.loader');

if (loader) {
  loader.classList.remove('loader-hidden');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if (loader) {
      loader.classList.add('loader-hidden');
    }
  })
  .catch(err => console.error(err));
