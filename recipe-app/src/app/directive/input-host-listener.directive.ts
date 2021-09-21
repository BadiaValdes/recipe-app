import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { HostListenerInUseService } from '../service/host-listener-in-use.service';

@Directive({
  selector: '[appInputHostListener]'
})
export class InputHostListenerDirective {

  constructor(
    private _elementRef : ElementRef,
    private _hostListenerInUse : HostListenerInUseService,
    private _renderer2 : Renderer2) {
      this._renderer2.listen(this._elementRef.nativeElement, 'click', ()=>{this._hostListenerInUse.hostListenerInUseNextState(true)});
      this._renderer2.listen(this._elementRef.nativeElement, 'blur', ()=>{this._hostListenerInUse.hostListenerInUseNextState(false)});

   }

  

}
