import { Component, OnInit } from '@angular/core';
import {inOutAnimation, inOutMenuAnimation} from '../animations'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [inOutAnimation, inOutMenuAnimation]
})
export class HeaderComponent implements OnInit {
  showUnderMenu : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setShowUnderMenu(){
    this.showUnderMenu = this.showUnderMenu ? false: true;
  }

}
