import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { UserPasswordChangeComponent } from './user-password-change/user-password-change.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserAvatarComponent,
    UserProfileUpdateComponent,
    UserRecipesComponent,
    UserPasswordChangeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
