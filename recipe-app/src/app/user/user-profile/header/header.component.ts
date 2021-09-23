import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() backgroundImage: string;
  @Input() border: boolean = false;
  @Input() color: string;
  @Input() borderStroke: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
