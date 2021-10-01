import { Component, OnInit } from '@angular/core';

// Animation
import {inOutAnimation, slideInAnimation} from '../../animations'
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css'],
  animations: [inOutAnimation, slideInAnimation]
})
export class UserMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
