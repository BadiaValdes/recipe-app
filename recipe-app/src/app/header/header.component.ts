import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {inOutAnimation, inOutMenuAnimation, inOutAnimationFast} from '../animations'

import{UserService} from '../service/user.service';

import {EventEmitterService} from '../service/event-emitter.service'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [inOutAnimation, inOutMenuAnimation, inOutAnimationFast]
})
export class HeaderComponent implements OnInit {
  showUnderMenu : boolean = false; // OLD var, see the under menu of the page.

  @Output() sideNavToogle = new EventEmitter<boolean>(); // Side nive event emitter

  showUserComponents: boolean = false;



  constructor(private userServ : UserService, private event_emitter : EventEmitterService) { }

  ngOnInit(): void {

  }

  // SideNav toggle
  setShowUnderMenu(){
    this.sideNavToogle.emit(true);
    //this.showUnderMenu = this.showUnderMenu ? false: true;
  }

  getUserDataHeader(){    
    return this.userServ.getLogedUser();
  }

  get isAuth(){
    // wait 500ms before shows user info - prevents
    return this.userServ.isAuth()
  }

  logOUt(){
    this.userServ.logout();
  }

}
