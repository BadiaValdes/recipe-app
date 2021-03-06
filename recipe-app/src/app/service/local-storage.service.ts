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
  // Local storage creation -> In this case i selecto two of them
  localStorage(num: number){
    if(num == 0){
      return getLocalStorage();
    }
    else if(num == 1) 
      return getSessionStorage();
  
      
  }
  constructor() { }
}
