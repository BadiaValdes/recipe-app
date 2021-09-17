import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingEggComponent} from './loading-egg/loading-egg.component'


@NgModule({
  declarations: [LoadingEggComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingEggComponent],
})
export class SharedModuleModule { }
