import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth.interceptor';
import { provideSocketIo } from 'ngx-socket-io';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    provideSocketIo({ url: 'http://localhost:3000' }), // ✅ Ajout ici pour WebSocket notifications
  ]
};
