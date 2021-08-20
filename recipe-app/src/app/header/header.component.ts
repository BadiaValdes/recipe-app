import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {inOutAnimation, inOutMenuAnimation} from '../animations'

import{UserService} from '../service/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [inOutAnimation, inOutMenuAnimation]
})
export class HeaderComponent implements OnInit {
  showUnderMenu : boolean = false;

  @Output() sideNavToogle = new EventEmitter<boolean>();

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
    
  }

  setShowUnderMenu(){
    this.sideNavToogle.emit(true);
    //this.showUnderMenu = this.showUnderMenu ? false: true;
  }

  getUserData(){
    return this.userServ.getLogedUser();
  }



  get isAuth(){
    return this.userServ.isAuth();
  }

  logOUt(){
    this.userServ.logout();
  }

}
