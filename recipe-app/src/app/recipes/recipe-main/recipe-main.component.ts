import { Component, OnInit } from '@angular/core';

// Dialog
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Snack bar
import {MatSnackBar} from '@angular/material/snack-bar';

// Component
import {RecipeCreateComponent} from '../recipe-create/recipe-create.component'
import { Router, ActivatedRoute } from '@angular/router';
import {RecipeSnackCreateComponent} from '../recipe-sub-components/recipe-snack-create/recipe-snack-create.component'

// SnackBar Service
import {NotificationSnackBarService} from '../../service/notification-snack-bar.service'
import { NotificationSnackBarComponent } from 'src/app/reusables/notification-snack-bar/notification-snack-bar.component';

// Event Emitter Service
import {EventEmitterService} from '../../service/event-emitter.service'
import { Subscriber, Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

// idle
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core'

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  opened: boolean = false; // Controls the side nav arrow

  miFirstEvent : Subscription; // Old Subscription example

  // change opened value
  changeOpenArrowDirection(){
    this.opened = this.opened ? false : true;
  }

  constructor(public matDialog : MatDialog, // Dialog var -> Opens the create dialog
    private snackBar : MatSnackBar, // Old Snack var option -> Still in use
    private router : Router, // Routes handler
    private route : ActivatedRoute, // Routes Params Handler
    private _notificationSnackBarService : NotificationSnackBarService, // Snack service -> New way to call it
    private _eventEmitterTest: EventEmitterService, // Event emmiter service -> First one
    private _userService : UserService, // User Service API
    private _idle : Idle,
    ) { 
     
    }

  // Shows the first event data
  showEvent(p: string){
    console.log(p)
  }

  // Opens the creation dialog
  openCreateDialog(){
    const matDiag = this.matDialog.open(RecipeCreateComponent, {
      width: '900px',      
      disableClose: false,
      hasBackdrop: true,
    });

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
        
        this.openSnack("Ya se puede cocinar la nueva receta");
      
   
    }
    if(data.num == 3)
     {
      this.openSnack("La receta se quemó en el fuego");
     }
   
    })
  }

  ngOnInit(): void {
    // Here you have to make the subscription
    /* this.miFirstEvent = this._eventEmitterTest.miFistEventEmitter.subscribe(data => {
      const options = {
        duration: 3 * 1000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        data : {
          title: "Mensaje de prueba",
          message: "Esto es una prueba",
          actionButton: "Cierrame"
        }
      }
      this._notificationSnackBarService.openSimpleNotificationSnackBar("Evento Emitido","Si si ya Cierra",options)
    }) */
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // Call it to destroy the even binding
    /* if(this.miFirstEvent){
      this.miFirstEvent.unsubscribe();
      this.miFirstEvent = null;
    } */
  }

  // Open standar snack
  openSnack(message: string) {
    this.snackBar.open(message, "Cerrar",{duration: 3 * 1000})
  }

  // Open Snack Component Through service
  openSnackService(){
    const options = {
      duration: 3 * 1000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      data : {
        title: "Mensaje de prueba",
        message: "Esto es una prueba",
        actionButton: "Cierrame"
      }
    }
    // Simple notification SnackBar
    //this._notificationSnackBarService.openSimpleNotificationSnackBar("Mensaje de prueba", "Cierrate",options)

    // Complex notification SnackBar
    this._notificationSnackBarService.openComplexSnackBarNotification(options);
  }

  //Method that triggers the event
/*   generateEvent(){
    this._eventEmitterTest.emitTheFirstEvent();
  } */

  // Return True or False
  isUserAuth()
  {
    return this._userService.isAuth();
  }

}
