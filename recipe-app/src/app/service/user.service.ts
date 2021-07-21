import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Base URL
import {environment} from '../../environments/environment'

// Interface
import {User} from '../interfaces/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  recipeURL = environment.authURL;
  public token : string;
  public token_expires: Date;
  public username: string;
  private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http : HttpClient) { }

  public logIn(user){
    this.http.post(`${this.recipeURL}auth/login/`, JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
    )
  }

  public refreshToken() {
    this.http.post(`${this.recipeURL}auth/refresh-token/`, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token) {
    this.token = token;
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log(token_decoded);
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
