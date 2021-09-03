import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Site configuration
import { nomencladoresArray } from '../../../config/nomencladores';

// OutPut

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  data = nomencladoresArray;
  constructor() { }

  @Output() outputEvent = new EventEmitter(); // Emits the value after nomenclature selection

  @Output() creationEvent = new EventEmitter(); // Emits the value after nomenclature creation
 
  ngOnInit(): void {
  }

  // Second event
  addClickEvent(value) {
    this.creationEvent.emit(value);
  }

  // First event
  selectEvent(value) {
    console.log(value)
    this.outputEvent.emit(value);
  }



}
