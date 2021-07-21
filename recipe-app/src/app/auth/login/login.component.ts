import { Component, OnInit } from '@angular/core';

//service 
import {UserService} from '../../service/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {
    username : "",
    password : "",
  };

  public toke;

  constructor(private user_service : UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.user_service.logIn({'username': this.user.username, 'password': this.user.password});
  }
 
  refreshToken() {
    this.user_service.refreshToken();
  }
 
  logout() {
    this.user_service.logout();
  }

  getToke(){
    this.toke = this.user_service.token;
  }

}
