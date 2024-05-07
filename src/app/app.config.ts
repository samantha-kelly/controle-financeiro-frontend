import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { authInterceptor } from './services/auth-interceptor';
import { CustomErrorHandler } from './services/custom-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),

  { provide: ErrorHandler, useClass: CustomErrorHandler },
  provideAnimationsAsync(),
  provideHttpClient(
    withInterceptors([authInterceptor])
  ),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
  provideMomentDateAdapter()
  ]
};
