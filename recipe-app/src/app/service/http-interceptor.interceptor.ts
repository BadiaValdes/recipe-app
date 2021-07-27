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
@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
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
