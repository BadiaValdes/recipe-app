import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  of,
  fromEventPattern,
  ObservedValueOf,
  Subject,
} from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Router
import { Router } from '@angular/router';

// Dialog
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Dialog - Component
import { UserAvatarComponent } from '../user/user-avatar/user-avatar.component'; // User AVATAR
import { take, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserPageService {

  updateSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor(
    private _router: Router,
    private http: HttpClient,
    private _dialog: MatDialog,
    private _userService : UserService,
  
  ) {}

  // GET
  getUserDetails(userID: string) {
    return this.http.get(`${environment.baseImgURL}/users/${userID}`);
  }

  searchForUser(data) {
    return this.http.get(`${environment.baseImgURL}/users/`, {
      params: { search: data },
    });
  }

  // POST
  updateUserAvatar(userID: string, data) {
    return this.http.patch<any>(
      `${environment.baseImgURL}/user/change_avatar/${userID}`,
      data
    ).toPromise().then(e => {
      let user = this._userService.getLogedUser() 
      user.avatar = e['avatar'];
      this._userService.getLocalSotrage().setItem('user', JSON.stringify(user));
      console.log(e['avatar']);
      this.updateValueSubjectNext(true);
    });
  }

  updateUserBackground(userID: string, data) {
    return this.http.patch<any>(
      `${environment.baseImgURL}/user/change_background/${userID}`,
      data
    );
  }
  // PUT

  updateUserDetails(userID: string, data) {
    return this.http.put(`${environment.baseImgURL}/users/${userID}`, data);
  }

  updateUserPassword(userID: string, data) {
    return this.http.put(
      `${environment.baseImgURL}/user/change_password/${userID}`,
      data
    );
  }

  updateUserAdminInfo(userID: string, data) {
    return this.http.put(
      `${environment.baseImgURL}/user/change_background/${userID}`,
      data
    );
  }

  // Behavior Subject for update observation

  updateValueSubjectNext(value : boolean){
    this.updateSubject.next(value);
  }

  updateSubjectSubscriber(){
    return this.updateSubject;
  }

  // Dialog Form Service

  /////////////////////////// AVATAR

  UpadteAvatarDialog(userID) {
    this._dialog.open(UserAvatarComponent, { data: userID });
  }

  /////////////////////////// END AVATAR
}
