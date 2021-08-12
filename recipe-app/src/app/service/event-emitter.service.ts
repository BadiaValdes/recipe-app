import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  
  public miFistEventEmitter : EventEmitter<any> = new EventEmitter<any>();

  // Can be use with T value
  //public EntryAdded: EventEmitter<StoryEntry> = new EventEmitter<StoryEntry>();

  constructor() { }

  emitTheFirstEvent(product) {
    console.log("Emitido")
    this.miFistEventEmitter.emit(product)
  }
}
