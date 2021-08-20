import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  
  public miFistEventEmitter : EventEmitter<any> = new EventEmitter<any>();

  public recipeDetailsEventEmitter : EventEmitter<any> = new EventEmitter<any>();

  public testEmitterEvent : EventEmitter<any> = new EventEmitter<any>();

  // Can be use with T value
  //public EntryAdded: EventEmitter<StoryEntry> = new EventEmitter<StoryEntry>();

  constructor() { }

  emitTheFirstEvent(product) {
    this.miFistEventEmitter.emit(product)
  }

  recipeDetailsEmitEvent(recipe){
    this.recipeDetailsEventEmitter.emit(recipe);
  }

  eventTest(){
    this.testEmitterEvent.emit("hola mundo")
  }
}
