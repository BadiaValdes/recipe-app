import { Injectable, OnDestroy, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, fromEventPattern, ObservedValueOf, Subject } from 'rxjs';
import { catchError, map, tap, elementAt } from 'rxjs/operators';

// Base URL
import { environment } from '../../environments/environment';

// Interface
import { User } from '../interfaces/user';

//Service
import { LocalStorageService } from './local-storage.service';
import { EventEmitterService } from './event-emitter.service';
import { NotificationSnackBarService } from './notification-snack-bar.service';

// config
import {simpleConfiguration} from '../config/snackBarConfig';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogServiceService } from './confirm-dialog-service.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private local_storage: Storage;

  private code_status: number;
  recipeURL = environment.authURL;
  recipeApiUrl = environment.baseURL;
  public token: string;
  public error: any[];
  public token_expires: Date;
  public username: string;

  private isAut = false;
  private is_save = false;

  private isAuthSubject : Subject<boolean> = new Subject<boolean>();


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  



  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private _event_emitter: EventEmitterService,
    private _snack_notification: NotificationSnackBarService,
    private _router: Router,
    private _confirmDialog : ConfirmDialogServiceService,
  
  ) {
    
    this.local_storage = localStorage.localStorage(0);
    this.isAuthSubject.next(false);
    
  }

  //  public  logIn(user){
  //     this.http.post(`${this.recipeURL}auth/login/`, JSON.stringify(user),  this.httpOptions).subscribe(
  //      data => {
  //        this.updateData(data['token']);
  //        this.error = null;
  //      },err => {
  //        this.error = err['status'];
  //      }

  //    )
  //  }

  public logIn(user) {
 
    let promise = new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.recipeURL}auth/login/`,
          JSON.stringify(user),
          this.httpOptions
        )
        .toPromise()
        .then(
          (res) => {
            // Success
            this.updateData(res['token']);
            this.isAuthObservable(true);
            resolve;
          },
          (msg) => {
            // Error
            this.error = msg['error'];
            this.code_status = msg['status'];
            
            reject(msg);
           
          }
        ).catch(e => {console.log(e)}).then(_ => this.isAut=true)
    });
    return promise;
    
  }

  public isAuthObservable(state: boolean){    
    return this.isAuthSubject.next(state);
  }

  public isAuthSubcriber():Observable<boolean>{
    return this.isAuthSubject.asObservable();
  }



  public isAuth(): boolean {
    return this.getLocalSotrage().getItem('user') != null;
  }

  public clearLocalStorage() {
    this.local_storage.clear();
  }

  public refreshToken() {
    this.http
      .post(
        `${this.recipeURL}auth/refresh-token/`,
        JSON.stringify({ token: this.token }),
        this.httpOptions
      )
      .subscribe((data) => {
        this.updateData(data['token']);
      });
  }

  public forceLogout(){
    this._router.navigateByUrl('recipe');
    this.local_storage.removeItem('token');
    this.local_storage.removeItem('user');
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.isAut = false;
    this.isAuthObservable(false);
  }

  public logout() {
    this._confirmDialog.openDialog({
      title: "LogOut",
      description: "Dejar de ser cocinero por hoy?",
      actionButton: "LogOut",
      name: "LogOut"})
    this._confirmDialog.dialogFinalValue().subscribe(
      data => {
        if(data == 1)
        {
          this.forceLogout();
        }
      }
    )  
    
  }

  public getLocalSotrage() {
    return this.local_storage;
  }

  public getLocalSotrageToken() {
    if(this.is_save)
      return this.local_storage.getItem('token');
    else
      return null;
  }

  public getError() {
    return this.error;
  }

  public getCodeStatus() {
    return this.code_status;
  }

  public getDecodeToken(token) {
    const token_parts = token.split(/\./);
    return JSON.parse(window.atob(token_parts[1]));
  }

  getHttpOpeion() {
    if (this.getLocalSotrageToken()) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'JWT ' + this.getLocalSotrageToken(),
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    }
  }

  getLogedUser(){  
    return JSON.parse(this.local_storage.getItem('user'));   
  }  

  public userGroups(){
    if(this.getLogedUser())
      return this.getLogedUser().groups as Array<string>
    else 
      return null
  }

  public isAdmin(){
    if(this.userGroups())
      return this.userGroups().find(element => element === "admin")
    else
      return false
  }

  public getUserData() {
    let userid = this.getDecodeToken(this.local_storage.getItem('token'))
      .user_id;
    this.http
      .get<User>(`${this.recipeURL}users/${userid}`, this.getHttpOpeion())
      .toPromise()
      .then((data) => {
        if(data['is_active'])
        {
          this.local_storage.setItem(
         
            'user',
            JSON.stringify({
              id: data['id'],
              last_login: data['last_login'],
              background_image: data['background_image'],
              username: data['username'],
              first_name: data['first_name'],
              last_name: data['last_name'],
              is_staff: data['is_staff'],
              is_active: data['is_active'],
              email: data['email'],
              date_joined: data['date_joined'],
              avatar: data['avatar'],
              groups: data['groups'],
            })
          );
          this.is_save = true;
        }
        else
        {
          this.forceLogout();
        }
        
       
        // The oposite process
      });
  }

  public isSave() : Observable<boolean> {
    return of(this.is_save);
  }

  private updateData(token) {
    this.token = token;
    this.local_storage.setItem('token', this.token);
    // decode the token to read the username and expiration timestamp

    const token_decoded = this.getDecodeToken(this.token);
   
    this.getUserData();

    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

  // is in group methods
  isUserAdmin(){
    if(this.isAuth()){
      return this.userGroups().find((group:String) => group.toLocaleLowerCase() === 'admin')
    }
  }
}
