import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubStringPipe } from './sub-string.pipe';



@NgModule({
  declarations: [
    SubStringPipe
  ],
  exports:[SubStringPipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
