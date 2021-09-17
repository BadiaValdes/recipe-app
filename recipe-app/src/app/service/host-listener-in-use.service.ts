import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostListenerInUseService {

  hostListenerInUse : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public hostListenerInUseNextState(state:boolean){
    this.hostListenerInUse.next(state);
  }

  public hostListenerInUseObservable() : Observable<boolean>{
    return this.hostListenerInUse.asObservable()
  }

  public hostListenerInUseNotObservable() {
    return this.hostListenerInUse
  }

  constructor() { }
}
