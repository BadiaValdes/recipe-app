import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserProfileSecondViewComponent } from './user-profile-second-view/user-profile-second-view.component';

import { IsAuthGuard } from '../auth/guard/is-auth.guard';
import { from } from 'rxjs';

// Guard

const routes: Routes = [
  { path: '', component: UserMainComponent,
  children: [
    { path: '',  component: UserProfileComponent, canActivate: [IsAuthGuard]},
    { path: ':username',  component: UserProfileSecondViewComponent},
    
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
