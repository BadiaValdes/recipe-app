import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeListComponent} from './recipe-list/recipe-list.component'
import {RecipeMainComponent} from './recipe-main/recipe-main.component'
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component'

import {AuthGuard} from '../auth/guard/auth.guard'


const routes: Routes = [
  {
    path: 'recipe',
    component: RecipeMainComponent,
    children: [
      { path: '',  component: RecipeListComponent },
      { path: ':id',  component: RecipeDetailsComponent },
    ]
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
