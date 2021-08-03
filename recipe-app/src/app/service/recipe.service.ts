import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// Base URL
import {environment} from '../../environments/environment';

// Interface
import {Recipe} from '../interfaces/recipe';

// service
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeURL = environment.baseURL;

  constructor(private http : HttpClient, private user_service : UserService, private router: Router) { }
  


  getHttpOpeion(){
    if (this.user_service.getLocalSotrageToken()){
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.user_service.getLocalSotrageToken()}),
        
      };
    }
    else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        }),
        
      };
    }
    

  }
     

  getRecipe() : Observable<Recipe[]>{

    let httpOptions = this.getHttpOpeion()

    return this.http.get<Recipe[]>(`${this.recipeURL}recipe/`, httpOptions).pipe(
      catchError(this.handleError<Recipe[]>('getRecipe', []))
    );
  }

  existRecipe(name: string){
    let httpOptions = this.getHttpOpeion()
    let find : boolean = false;
    return this.http.get<Recipe[]>(`${this.recipeURL}recipe/`, httpOptions)
    
    
    /*.toPromise().then((data)=>{
      data.forEach(element => {
        if(element.name === name)
        find = true;
      });
      return find;
    })*/
    
    .pipe(
      map(dat => {
       
      dat.forEach(dat=>{
        if(dat.name===name)
        {
          find = true
        }
      })
      return find;

      }),

    )

    
  }

  


  getRecipeDitails(id:number | string) :  Observable<Recipe>{
    let httpOptions = this.getHttpOpeion()

    return this.http.get<Recipe>(`${this.recipeURL}recipe/${id}`, httpOptions).pipe(
      catchError(this.handleError<Recipe>('getRecipe')))
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
