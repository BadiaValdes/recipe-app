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
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import {UserService} from './user.service'

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _userService : UserService) {}

  // Intercepts all the HTTP request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set the auth token
    if (this._userService.isAuth()){
      request = request.clone({
        setHeaders: {
          'Authorization': 'JWT ' + this._userService.getLocalSotrage().getItem('token'),
        }
      })    
    }

    // What do after request
    return next.handle(request).pipe(
      // In case of error
      catchError((error)=>{
        let handled = false;
 
if (error instanceof HttpErrorResponse) {
        if(error instanceof ErrorEvent)
        {
          console.log("Error disparado por un evento")
        }
        else
        {
          console.log(`Status code error: ${error.status}`);
          switch (error.status){
            // Here goes all the posible error code
            case 404:
              this.router.navigateByUrl('/404');
              handled = true;
              break;
            case 0:
              this.router.navigateByUrl('/404');
              handled = true;
              break;
          }
        }
        return throwError(error.message);
      }
      else{
        console.log("otro error")
      }
      if (handled) {
        console.log('return back ');
        return of(error);
      } else {
        console.log('throw error back to to the subscriber');
        return throwError(error);
      }
    }
    
)
    );
  }
}
