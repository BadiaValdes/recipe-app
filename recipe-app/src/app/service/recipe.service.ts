import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Base URL
import {environment} from '../../environments/environment'

// Interface
import {Recipe} from '../interfaces/recipe'


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeURL = environment.baseURL;
  constructor(private http : HttpClient) { }

  getRecipe() : Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.recipeURL}/recipe/`).pipe(
      catchError(this.handleError<Recipe[]>('getRecipe', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
