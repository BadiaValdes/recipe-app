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

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    TableComponent
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
  ]
})
export class NomencladoresModule { }
