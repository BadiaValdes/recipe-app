import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RecipeRoutingModule } from './recipe-routing.module';

// My Components
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeMainComponent } from './recipe-main/recipe-main.component';

// Material
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 

// FLEX
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RecipeRoutingModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
   
  ]
})
export class RecipeModule { }
