import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { UserService } from './user.service';
import { NotificationSnackBarService } from './notification-snack-bar.service';

import { simpleConfiguration } from '../config/snackBarConfig';
@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _userService: UserService,
    private _snack_notification: NotificationSnackBarService
  ) {}

  // Intercepts all the HTTP request
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Set the auth token
    if (this._userService.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization:
            'JWT ' + this._userService.getLocalSotrage().getItem('token'),
        },
      });
    }

    // What do after request
    return next.handle(request).pipe(
      // In case of error
      catchError((error) => {
        let handled = false;

        if (error instanceof HttpErrorResponse) {
          if (error instanceof ErrorEvent) {
            console.log('Error disparado por un evento');
          } else {
            console.log(`Status code error: ${error.status}`);
            switch (error.status) {
              // Here goes all the posible error code
              case 404:
                this.router.navigateByUrl('/404');
                handled = true;
                break;
              case 0:
                this.createSnackMessage(0);
                handled = true;
                break;
              case 400:
                this.createSnackMessage(400);
                handled = true;
                break;
              case 200:
                this.createSnackMessage(200);
                handled = true;
                break;
            }
          }
          return throwError(error.message);
        } else {
          console.log('otro error');
        }
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
      })
    );
  }
  createSnackMessage(request) {
    console.log(request);
    if (request == 0) {
      this.showSnackBar('Problema de conexion');
    } else if (request == 400) {
      this.showSnackBar('Datos erroneos');
    } else if (request == 200) {
      this.showSnackBar('Accion completada con exito');
    }
  }

  showSnackBar(text: string) {
    this._snack_notification.openSimpleNotificationSnackBar(
      text,
      'cerrar',
      simpleConfiguration
    );
  }
}
