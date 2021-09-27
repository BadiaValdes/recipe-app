import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';
import { UserDataComponent } from './user-profile/user-data/user-data.component';
import { AvatarImageComponent } from './user-profile/avatar-image/avatar-image.component';
import { HeaderComponent } from './user-profile/header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipeModule } from '../pipe/pipe.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserAvatarComponent,
    UserProfileUpdateComponent,
    UserRecipesComponent,
    UserPasswordChangeComponent,
    UserDataComponent,
    AvatarImageComponent,
    HeaderComponent,

  ],
  exports:[AvatarImageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    PipeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
