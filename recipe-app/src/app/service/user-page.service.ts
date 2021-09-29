import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// RXjs
import {
  BehaviorSubject,
  Observable,
  of,
  fromEventPattern,
  ObservedValueOf,
  Subject,
} from 'rxjs';
import { take, map } from 'rxjs/operators';

// Base URL
import { environment } from '../../environments/environment';

// Router
import { Router } from '@angular/router';

// Dialog
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Dialog - Component
import { UserAvatarComponent } from '../user/user-avatar/user-avatar.component'; // User AVATAR
import { UserPasswordChangeComponent } from '../user/user-password-change/user-password-change.component'; // User Password

// User service
import { UserService } from './user.service';
import { Recipe } from '../interfaces/recipe';

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

  getUserDetailsByUsername(username: string) {
    return this.http.get(`${environment.baseImgURL}/user/${username}`);
  }

  searchForUser(data) {
    return this.http.get<Recipe[]>(`${environment.baseImgURL}/api/recipe/`, {
      params: { search: data },
    });
  }

  // PATCH
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
    ).toPromise().then(data => {
      let user = this._userService.getLogedUser() 
      user.background_image = data['background_image'];
      this._userService.getLocalSotrage().setItem('user', JSON.stringify(user));
      this.updateValueSubjectNext(true);
    });
  }
  // PUT

  updateUserDetails(userID: string, data) {
    return this.http.put(`${environment.baseImgURL}/users/${userID}`, data);
  }

  updateUserPassword(userID: string, data) {
    console.log(userID)
    return this.http.patch<any>(
      `${environment.baseImgURL}/user/change_password/${userID}`,
      data
    ).subscribe();
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

  UpadteAvatarDialog(userID, type: number) {
    this._dialog.open(UserAvatarComponent, { data: {'user': userID, 'type': type} });
  }

  /////////////////////////// END AVATAR

  /////////////////////////// Background IMG
  UpadteBackgroundDialog(userID) {
    this._dialog.open(UserAvatarComponent, { data: userID });
  }
  /////////////////////////// END Background IMG

  /////////////////////////// Change Password
  updateUserPasswordDialog(userID) {
    this._dialog.open(UserPasswordChangeComponent, { data: userID });
  }
  /////////////////////////// END Change Password
}
