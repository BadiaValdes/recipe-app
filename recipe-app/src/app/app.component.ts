import {
  Component,
  OnInit,
  ViewChild,
  Host,
  HostListener,
  OnDestroy,
} from '@angular/core';

// Like a variable for the html
import { RouterOutlet, Router } from '@angular/router';
import { inOutAnimation } from './animations';

// Matirial
import { MatToolbarRow } from '@angular/material/toolbar';

// Service
import { UserService } from './service/user.service';

// Dialog
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Snack bar
import { MatSnackBar } from '@angular/material/snack-bar';

// Event Emitter Service
import { EventEmitterService } from './service/event-emitter.service';

// SnackBar Service
import { NotificationSnackBarService } from './service/notification-snack-bar.service';

// Create Component
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';

// Route var
import { routes } from './config/routes';

// Idle
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

// SiteConfig
import { idle_time, idleTimeOut } from './config/siteConfiguration';
import { ConfirmDialogServiceService } from './service/confirm-dialog-service.service';
import { HostListenerInUseService } from './service/host-listener-in-use.service';
import { take } from 'rxjs/operators';
import { UserPageService } from './service/user-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Import the animation
  animations: [inOutAnimation],
})
export class AppComponent implements OnDestroy {
  route = routes;
  @ViewChild('sidenav') sidenav;

  constructor(
    private _userService: UserService,
    public matDialog: MatDialog, // Dialog var -> Opens the create dialog
    private snackBar: MatSnackBar, // Old Snack var option -> Still in use
    private _notificationSnackBarService: NotificationSnackBarService, // Snack service -> New way to call it
    private _eventEmitterTest: EventEmitterService, // Event emmiter service -> First one
    private _router: Router,
    private _idle: Idle,
    private _confirmDialog: ConfirmDialogServiceService,
    private _hostListenerInUse: HostListenerInUseService,
    private _userPage : UserPageService,
  ) {
    this._idle.setIdle(idle_time * 60);
    this._idle.setTimeout(idleTimeOut * 60);
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // this._idle.onIdleStart.subscribe(_ => {
    //   console.log("comenzo la pasion")
    // })

    // this._idle.onIdleEnd.subscribe(_ => {
    //   console.log("Se acabo lo que se daba")
    // })

    // this._idle.onInterrupt.subscribe(_=>{
    //   console.log("se jodio esto")
    // })

    this._idle.onTimeout.subscribe(() => {
      if (this._userService.isAuth()) {
        console.log('Out of time');
        this._userService.forceLogout();
        this._confirmDialog.openDialog({
          title: 'Separado de la cocina',
          description:
            'Usted lleva mucho tiempo separado de la cocina, por lo que guardamos el sarten hasta que vuelva a entrar',
          actionButton: 'ok',
          name: 'Separado de la cocina',
        });
      }
    });
    this._userService.isAuthObservable(true)
    this._userService.isAuthSubcriber().subscribe((d) => {
      console.log(d)
      if (d) this._idle.watch();
    });

    /*  window.addEventListener('beforeunload', function(event) {console.log(event); 
      event.preventDefault(); 
 
      console.log(this.performance)
   
    event.returnValue="LALO2"
      
      }) */
    //window.onbeforeunload = (event) => {_userService.getLocalSotrage().clear(), console.log(event)}
  }

  ngOnDestroy() {
    this._userService.getLocalSotrage().clear();
  }

  title = 'routing';

  closeOpenSideNav() {
    if (this.sidenav._opened) {
      this.sideNavToogle();
    }
  }

  @HostListener('document:keyup', ['$event'])
  hostListenerEventsKeyDown(event) {    
      this._hostListenerInUse
        .hostListenerInUseNotObservable().pipe(take(1))
        .subscribe((data) => {
          if (!data) {
            if (event.key === 'm') {
              this.sideNavToogle();
            } else {
              if (event.key === 'r') {
                this._router.navigateByUrl('recipe');
              } else if (event.key === 'w') {
                this._router.navigateByUrl('recipe/what-do-i-cook-today');
              } else if (event.key === 'c') {
                this.openCreateDialog();
                this._hostListenerInUse.hostListenerInUseNextState(true);
              }
             else if (event.key === 'p') {
              this._router.navigateByUrl(this.route.user.url);
            }
              this.closeOpenSideNav();
            }
          }
        });
    

   
    event.stopPropagation();
  }

  sideNavToogle() {
    this.sidenav.toggle();
  }

  getAnimationData(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  isUserAuth() {
    return this._userService.isAuth();
  }

  isAdmin() {
    return this._userService.isAdmin();
  }

  openCreateDialog() {
    const matDiag = this.matDialog.open(RecipeCreateComponent, {
      width: '900px',
    });

    let option = {
      duration: 2000,
      verticalPosition: 'button',
      horizontalPosition: 'center',
    };
    // Get data after close
    matDiag.afterClosed().subscribe((data) => {
      this._hostListenerInUse.hostListenerInUseNextState(false);
      // Manage that data
      if (data.num == 2) {
        // get url param
        //let state = this.route.snapshot.queryParams.done
        if (data.receta) {
          console.log('Listo Para emitir');
          this._eventEmitterTest.emitTheFirstEvent(data.receta);
        }

        this._notificationSnackBarService.openSimpleNotificationSnackBar(
          'Ya se puede cocinar la nueva receta',
          'Cerrar',
          option
        );
      }
      if (data.num == 3) {
        this._notificationSnackBarService.openSimpleNotificationSnackBar(
          'La receta se quemó en el fuego',
          'Cerrar',
          option
        );
      }
    });
  }

  getUserRecipe(){
    this._userPage.getUserRecipe();
  }

  logOut(){
    this._userService.logout();
  }
}
