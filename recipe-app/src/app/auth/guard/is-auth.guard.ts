import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(private userService : UserService, private router: Router){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogedIn();
  }

  isLogedIn(){
    if(this.userService.isAuth()){
      return true;
    }
    else
    {
      return this.router.parseUrl('/login'); // Kick off to the main page
    }
  }
  
}
