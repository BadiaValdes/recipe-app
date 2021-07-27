import { Injectable } from '@angular/core';

function getLocalStorage():Storage {
  return localStorage;  
}

function getSessionStorage(): Storage{
  return sessionStorage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage(num: number){
    if(num == 0){
      return getLocalStorage();
    }
 
      return getSessionStorage();
  
      
  }
  constructor() { }
}
