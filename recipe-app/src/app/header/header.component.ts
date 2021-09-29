import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  inOutAnimation,
  inOutMenuAnimation,
  inOutAnimationFast,
} from '../animations';

import { UserService } from '../service/user.service';

import { EventEmitterService } from '../service/event-emitter.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfirmDialogServiceService } from '../service/confirm-dialog-service.service';

// Site configuration
import {routes} from '../config/routes'
import { UserPageService } from '../service/user-page.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [inOutAnimation, inOutMenuAnimation, inOutAnimationFast],
})
export class HeaderComponent implements OnInit {
  showUnderMenu: boolean = false; // OLD var, see the under menu of the page.

  @Output() sideNavToogle = new EventEmitter<boolean>(); // Side nive event emitter

  showUserComponents: boolean = false;

  route = routes;

  constructor(
    private userServ: UserService,
    private _user : UserPageService,
    private event_emitter: EventEmitterService,
    private _router: Router,
    private _confirmDialog: ConfirmDialogServiceService,
  ) {}

  ngOnInit(): void {}

  // SideNav toggle
  setShowUnderMenu() {
    this.sideNavToogle.emit(true);
    //this.showUnderMenu = this.showUnderMenu ? false: true;
  }

  getUserDataHeader() {
    return this.userServ.getLogedUser();
  }

  get isAuth() {
    // wait 500ms before shows user info - prevents
    return this.userServ.isAuth();
  }

  logOUt() {
    this.userServ.logout();   
  }

  searchRecipes(){
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.navigateByUrl('/recipe', { state: { recipeSearch: true, user: this.getUserDataHeader().id}}).then(_ => {
        //this._router.routeReuseStrategy.shouldReuseRoute = () => true;
      });
      this._user.updateValueSubjectNext(true);
   /*  this._router.navigateByUrl('/recipe',{ skipLocationChange: true

      },).then(_ => {
        this._router.navigateByUrl('/recipe', { state: { recipeSearch: true, user: this.getUserDataHeader().id}})
      })

      this._user.updateValueSubjectNext(true); */
  }
}
