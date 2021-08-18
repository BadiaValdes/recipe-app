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

  @Output() outputEvent = new EventEmitter();

  @Output() creationEvent = new EventEmitter();
 
  ngOnInit(): void {
  }

  addClickEvent(value) {
    this.creationEvent.emit(value);
  }

  selectEvent(value) {
    console.log(value)
    this.outputEvent.emit(value);
  }



}
