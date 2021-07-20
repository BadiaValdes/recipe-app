import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RecipeRoutingModule } from './recipe-routing.module';

// Material
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatExpansionModule} from '@angular/material/expansion'; 

// Timeline Module
//import { MglTimelineModule } from 'angular-mgl-timeline';

// Pipe



// FLEX
import {FlexLayoutModule} from '@angular/flex-layout';

// My Components
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeMainComponent } from './recipe-main/recipe-main.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeHeaderComponent } from './recipe-details/recipe-header/recipe-header.component';
import { RecipeDescriptionComponent } from './recipe-details/recipe-description/recipe-description.component';
import { RecipeStepsComponent } from './recipe-details/recipe-steps/recipe-steps.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeModifyComponent } from './recipe-modify/recipe-modify.component';
import { RecipeIngredientComponent } from './recipe-details/recipe-ingredient/recipe-ingredient.component';
import { SplitInterfacePipe } from './split-interface.pipe';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeMainComponent,
    RecipeDetailsComponent,
    RecipeHeaderComponent,
    RecipeDescriptionComponent,
    RecipeStepsComponent,
    RecipeCreateComponent,
    RecipeModifyComponent,
    RecipeIngredientComponent,
    SplitInterfacePipe,
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
    MatStepperModule,  

    MatExpansionModule,
  ]
})
export class RecipeModule { }
