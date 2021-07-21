import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Components
import {LoginComponent} from './login/login.component'

const routes: Routes = [
  {
    path: 'login',    component: LoginComponent,   
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
