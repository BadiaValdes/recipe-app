import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() backgroundImage: string;
  @Input() border: boolean = false;
  @Input() color: string;
  @Input() borderStroke: number;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }
 
}
