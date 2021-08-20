import { Component, OnInit, ViewChild } from '@angular/core';

// Like a variable for the html
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

// Matirial
import {MatToolbarRow} from '@angular/material/toolbar'

// Service
import {UserService} from './service/user.service'

// Dialog
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Snack bar
import {MatSnackBar} from '@angular/material/snack-bar';

// Event Emitter Service
import {EventEmitterService} from './service/event-emitter.service'

// SnackBar Service
import {NotificationSnackBarService} from './service/notification-snack-bar.service'

// Create Component
import {RecipeCreateComponent} from './recipes/recipe-create/recipe-create.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Import the animation
  animations: [ slideInAnimation ]
})
export class AppComponent {

  @ViewChild('sidenav') sidenav;

  constructor(
    private _userService: UserService,
    public matDialog : MatDialog, // Dialog var -> Opens the create dialog
    private snackBar : MatSnackBar, // Old Snack var option -> Still in use
    private _notificationSnackBarService : NotificationSnackBarService, // Snack service -> New way to call it
    private _eventEmitterTest: EventEmitterService, // Event emmiter service -> First one
    
  ){

  }

  title = 'routing';

  sideNavToogle(value){
    this.sidenav.toggle();
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  isUserAuth(){
return this._userService.isAuth()
  }

  openCreateDialog(){
    const matDiag = this.matDialog.open(RecipeCreateComponent, {
      width: '900px',
    });

    let option = {
      duration: 2000,
      verticalPosition: 'button',
      horizontalPosition: 'center',
    }
    // Get data after close
    matDiag.afterClosed().subscribe((data) => {

      // Manage that data
    if(data.num == 2)
    {
      
      // get url param
      //let state = this.route.snapshot.queryParams.done
      if(data.receta){
        console.log("Listo Para emitir")
        this._eventEmitterTest.emitTheFirstEvent(data.receta)
      }
      
        this._notificationSnackBarService.openSimpleNotificationSnackBar("Ya se puede cocinar la nueva receta", "Cerrar",option)
        
      
   
    }
    if(data.num == 3)
     {
      this._notificationSnackBarService.openSimpleNotificationSnackBar("La receta se quemó en el fuego", "Cerrar",option)

     }
   
    })
  }
}
