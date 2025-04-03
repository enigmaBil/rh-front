import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from './auth/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);


  return next(req).pipe(
    // @ts-ignore
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401){
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(req);
          }),
          catchError((refreshError) => {
            // Si le rafraîchissement échoue, déconnectez l'utilisateur
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
}
