import { Component, OnInit } from '@angular/core';

//service

import { UserService } from '../../service/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EventEmitterService } from '../../service/event-emitter.service';
import { HostListenerInUseService } from 'src/app/service/host-listener-in-use.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  snackBarDuration = 5; // The snack duration configuration

  // a Dictionary
  public user = {
    username: '',
    password: '',
  };

  public toke; // User Token

  constructor(
    public user_service: UserService,
    private snackbar: MatSnackBar,
    private _event_emitter: EventEmitterService,
    public _hostListenerInUse : HostListenerInUseService,
  ) {}

  ngOnInit(): void {}

  login() {
    try {
      this.user_service.logIn({
        username: this.user.username,
        password: this.user.password,
      });
    } catch (e) {}
  }

  refreshToken() {
    this.user_service.refreshToken();
  }

  logout() {
    this.user_service.logout();
  }

  getToke() {
    this.toke = this.user_service.getLocalSotrageToken();
  }

  showSnackBar(message: any) {
    this.snackbar.open(message, 'Close');
  }
}
