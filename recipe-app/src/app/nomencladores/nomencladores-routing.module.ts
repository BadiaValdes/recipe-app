import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListComponent} from './list/list.component'

import {AuthGuard} from '../auth/guard/auth.guard'

const routes: Routes = [
 {
  path: '',
  component: ListComponent,
  canActivate: [AuthGuard],
  data: {rol:['admin','staff']}
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomencladoresRoutingModule { }
