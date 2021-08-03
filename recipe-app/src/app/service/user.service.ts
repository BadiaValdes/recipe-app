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
  recipeApiUrl = environment.baseURL;
  public token : string;
  public error: any [];
  public token_expires: Date;
  public username: string;
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })};



  constructor(private http : HttpClient, private localStorage : LocalStorageService) { 
    this.local_storage = localStorage.localStorage(1);
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

  public clearLocalStorage(){

    this.local_storage.clear();
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
    this.local_storage.removeItem('user');
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

  public getDecodeToken(token){
    const token_parts = token.split(/\./);
    return JSON.parse(window.atob(token_parts[1]));
  }


  getHttpOpeion(){
    if (this.getLocalSotrageToken()){
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.getLocalSotrageToken()}),
      };
    }
    else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        }),
        
      };
    }
    

  }

  getLogedUser(){
    return JSON.parse(this.local_storage.getItem('user'))
  }
  
    

  public getUserData(){
    
    let userid = this.getDecodeToken(this.local_storage.getItem('token')).user_id;
    this.http.get<User>(`${this.recipeURL}users/${userid}`, this.getHttpOpeion()).toPromise().then(data =>{
    
      this.local_storage.setItem('user', JSON.stringify({
        id: data['id'],
        last_login: data['last_login'],
        user_name : data['username'],
        first_name: data['first_name'],
        last_name:data['last_name'],
        mail: data['email'],
        date_joined : data['date_joined'],
        avatar: data['avatar'],
        groups: data['groups'], 
      }
));
      // The oposite process 
      
    });
  
  }  

  private updateData(token) {
    this.token = token;
    this.local_storage.setItem('token',this.token);
    // decode the token to read the username and expiration timestamp
    
    const token_decoded = this.getDecodeToken(this.token);
    this.getUserData();
   
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
