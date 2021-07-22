import { Component, OnInit } from '@angular/core';
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

  constructor(private userServ : UserService) { }

  ngOnInit(): void {
  }

  setShowUnderMenu(){
    this.showUnderMenu = this.showUnderMenu ? false: true;
  }

  get isAuth(){
    return this.userServ.isAuth();
  }

  logOUt(){
    this.userServ.logout();
  }

}
