import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Base URL
import {environment} from '../../environments/environment'

// Interface
import {User} from '../interfaces/user'

//Service
import {LocalStorageService} from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private local_storage : Storage;
  private code_status : number;
  recipeURL = environment.authURL;
  public token : string;
  public error: any [];
  public token_expires: Date;
  public username: string;
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })};



  constructor(private http : HttpClient, private localStorage : LocalStorageService) { 
    this.local_storage = localStorage.localStorage;
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
      this.http.post(`${this.recipeURL}auth/login/`, JSON.stringify(user),  this.httpOptions)
        .toPromise()
        .then(
          res => { // Success
            this.updateData(res['token']);
            resolve;
          },
          msg => { // Error
            this.error = msg['error'];
            this.code_status = msg['status']
  
            reject(msg);
          }
        );
    });
    return promise;
  }

  public isAuth(): boolean{
    return this.local_storage.getItem("token")? true : false;
  } 

  public refreshToken() {
    this.http.post(`${this.recipeURL}auth/refresh-token/`, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
    );
  }

  public logout() {
    this.local_storage.removeItem('token');
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  public getLocalSotrage(){
    return this.local_storage;
  }

  public getLocalSotrageToken(){
    return this.local_storage.getItem('token');
  }

  public getError(){
    return this.error;
  }

  public getCodeStatus(){
    return this.code_status;
  }




  private updateData(token) {
    this.token = token;
    this.local_storage.setItem('token',this.token);
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log(token_decoded);
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
