import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ShopStore } from './store';
import { provideEffects } from '@ngrx/effects';
import { StockEffects } from './store/stock/stock.effects';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), // For SSR. May upgrade with withIncrementalHydration() from A19 (eventReplay is enabled by default)
    provideHttpClient(withFetch()),
    provideEffects(StockEffects),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      toastClass: 'aldi-toast ngx-toastr',
    }),
    ...ShopStore,
  ],
};
