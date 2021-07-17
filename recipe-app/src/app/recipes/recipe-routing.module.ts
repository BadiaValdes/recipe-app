import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RecipeListComponent} from './recipe-list/recipe-list.component'
import {RecipeMainComponent} from './recipe-main/recipe-main.component'

const routes: Routes = [
  {
    path: '',
    component: RecipeMainComponent,
    children: [
      { path: '',  component: RecipeListComponent }
    ]
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
