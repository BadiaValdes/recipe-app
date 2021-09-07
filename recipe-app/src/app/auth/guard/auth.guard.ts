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

  // Check the roles to se if can active admin parts of the route
  canActivate(
    route: ActivatedRouteSnapshot, // Use the route snapshot to take the params
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.isLogedIn())
    {
      return this.router.parseUrl('/login'); // Kick off to the main page
    }
    else{
      let role = route.data['rol'] as Array<string>; // Loads the roles array (use params hardcode in the route.py)
      console.log(role)
      return this.isAdmin(route.data['rol']);
    }

  }

  // Loged in guard -> Is the user not logged, please send it back to login page
  isLogedIn(){
    if(this.userService.isAuth()){
      return true;
    }
    else
    {
      return false;
    }
  }

  // Search for admin role
  isAdmin(role : string []){
      
      let isAdmin : boolean = false;
      let userParser = JSON.parse(this.userService.getLocalSotrage().getItem('user')); // Parse user data form LocalStorage
      let userRoles = userParser.groups; // Get Users Groups
      role.forEach(element => {
        isAdmin = isAdmin || userRoles.find(x => x== element) // Find inside the role
      });
  
      if(isAdmin)
       return true; // If is admin continue exploring
      else
       return this.router.parseUrl('/recipe'); // Kick off to the main page
    }
    
    
  }
  
