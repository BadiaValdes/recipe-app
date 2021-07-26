import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';

// Service
import {UserService} from '../../service/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService : UserService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role = route.data['roles'] as Array<string>;
    return this.isAdmin(role);
  }

  isLogedIn(){
    if(this.userService.isAuth())
      return true;
    else
    {
      return this.router.parseUrl('/login');
    }
  }

  isAdmin(role : string []){
    let isAdmin : boolean = false;
    let userParser = JSON.parse(this.userService.getLocalSotrage().getItem('user'));
    let userRoles = userParser.groups;
    role.forEach(element => {
      isAdmin = isAdmin || userRoles.find(x => x== element)
    });

    if(isAdmin)
     return true;
    else
     return this.router.parseUrl('/login');
  }
  
}
