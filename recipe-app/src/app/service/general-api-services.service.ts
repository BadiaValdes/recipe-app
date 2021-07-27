import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// userService
import {UserService} from './user.service'

// ENV
import {environment} from 'src/environments/environment';

// Interfaces
import {Category} from '../interfaces/category';
import {Difficulty} from '../interfaces/difficulty';
import {Product} from '../interfaces/product';
import {Measurement} from '../interfaces/measurement';

@Injectable({
  providedIn: 'root'
})
export class GeneralApiServicesService {

  httpAPI = environment.baseURL;

  getHttpOpeion(){
    if (this.userService.getLocalSotrageToken()){
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.userService.getLocalSotrageToken()}),
        
      };
    }
    else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        }),
        
      };
    }
    

  }
     

  constructor(private userService : UserService, private http : HttpClient) { }



  getProducts(): Observable<Product[]>{
    let httpOptions = this.getHttpOpeion()
    return this.http.get<Product[]>(`${this.httpAPI}product/`, httpOptions).pipe(catchError(this.handleError<Product[]>('getProduct', [])));
  }

  getCategory(): Observable<Category[]>{
    let httpOptions = this.getHttpOpeion()
    return this.http.get<Category[]>(`${this.httpAPI}category/`, httpOptions).pipe(catchError(this.handleError<Category[]>('getCategory', [])));
  }

  getDifficulty(): Observable<Difficulty[]>{
    let httpOptions = this.getHttpOpeion()
    return this.http.get<Difficulty[]>(`${this.httpAPI}difficulty/`, httpOptions).pipe(catchError(this.handleError<Difficulty[]>('getDifficulty', [])));
  }

  getMeasurement(): Observable<Measurement[]>{
    let httpOptions = this.getHttpOpeion()
    return this.http.get<Measurement[]>(`${this.httpAPI}measurement/`, httpOptions).pipe(catchError(this.handleError<Measurement[]>('getMeasurement', [])));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable< T> => {
        
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
     
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
