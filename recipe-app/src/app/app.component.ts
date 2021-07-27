import { Component, OnInit } from '@angular/core';

// Like a variable for the html
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

// Matirial
import {MatToolbarRow} from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Import the animation
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'routing';
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
