import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomencladoresRoutingModule } from './nomencladores-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

import {MatListModule} from '@angular/material/list'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSortModule} from '@angular/material/sort'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { TableComponent } from './list/table/table.component'; 

import {MatFormFieldModule,} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'; 
import {MatButtonModule} from '@angular/material/button'; 

//animaiton
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ItemsComponent } from './list/items/items.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    TableComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    NomencladoresRoutingModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class NomencladoresModule { }
