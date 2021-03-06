import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// My components
import {HeaderComponent} from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// My components END

// MATIRIAL
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';  
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav'; 
// MATIRIAL END

// Flex Layout
import {FlexLayoutModule} from '@angular/flex-layout';
// Flex Layout END


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { from } from 'rxjs';


// Interceptor
import {HttpInterceptorInterceptor} from './service/http-interceptor.interceptor';
import { PrincipalCheckDirective } from './directive/arra-form/principal-check.directive';
import { RecipeNameDirective } from './directive/exist-field/recipe/recipe-name.directive';
import { ConfigDialogComponent } from './reusables/config-dialog/config-dialog.component';
import { NotificationSnackBarComponent } from './reusables/notification-snack-bar/notification-snack-bar.component';
import { OpenSheetComponent } from './reusables/openSheet/open-sheet/open-sheet.component';

// My Module
import { RecipeModule } from './recipes/recipe.module';
import { AuthModule } from './auth/auth.module';
import {NomencladoresModule} from './nomencladores/nomencladores.module'
import {AdminPanelModule} from './admin/admin-panel.module'

// IDLE
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive'
import {NgIdleModule} from '@ng-idle/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';









@NgModule({
  declarations: [
    AppComponent,    
    PageNotFoundComponent, 
    HeaderComponent, PrincipalCheckDirective, RecipeNameDirective, ConfigDialogComponent, NotificationSnackBarComponent, OpenSheetComponent,
  
  ],
  // The order of imports is very important
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    NgIdleModule.forRoot(),
    FormsModule,  
   

    //CrisisModule, -> For lazy load, the module cant be imported here
    //AdminModule, -> For lazy load, the module cant be imported here

    // HTTP CALL *******
    //HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}), // Tells to the HttpClient to use the service InMemory for the API
    // HTTP CALL ******* END   
    AuthModule,
    RecipeModule,
    AppRoutingModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatSidenavModule,
    UserModule,
    
    
    
    
    
  ],


  providers: [
    // HTTP INTERCEPTOR for ERROR handle
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
