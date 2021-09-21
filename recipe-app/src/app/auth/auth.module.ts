import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SingupComponent } from './singup/singup.component';

import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';

// FLEX
import {FlexLayoutModule} from '@angular/flex-layout';

// DirectiveModule
import {DirectiveModule} from '../directive/directive.module'

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SingupComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSnackBarModule,
    DirectiveModule,
    
  ]
})
export class AuthModule { }
