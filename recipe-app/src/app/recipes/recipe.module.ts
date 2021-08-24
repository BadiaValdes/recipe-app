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
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
// Timeline Module
//import { MglTimelineModule } from 'angular-mgl-timeline';

// Pipe

//Form
import { ReactiveFormsModule } from '@angular/forms';


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
import { RecipeOptionsComponent } from './recipe-details/recipe-options/recipe-options.component';
import {MatRadioModule} from '@angular/material/radio';
import { RecipeSnackCreateComponent } from './recipe-sub-components/recipe-snack-create/recipe-snack-create.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

// WYSIWYG
import { AngularEditorModule } from '@kolkov/angular-editor';

// Angular load bar
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import { RecipeInstantDetailsComponent } from './recipe-instant-details/recipe-instant-details.component';
import { SearchFilterPipe } from './search-filter.pipe';



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
    RecipeOptionsComponent,
    RecipeSnackCreateComponent,
    RecipeInstantDetailsComponent,
    SearchFilterPipe,
    

  
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
    MatBottomSheetModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    AngularEditorModule,
    MatProgressSpinnerModule,
    LoadingBarHttpClientModule,
  ]
})
export class RecipeModule { }
