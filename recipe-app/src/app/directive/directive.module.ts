import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputHostListenerDirective} from './input-host-listener.directive'



@NgModule({
  declarations: [InputHostListenerDirective],
  exports: [InputHostListenerDirective],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
