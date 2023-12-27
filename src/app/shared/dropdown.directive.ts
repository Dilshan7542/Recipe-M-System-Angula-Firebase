import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen=false;
  constructor(private elementRef:ElementRef,private renderer:Renderer2) { }
  @HostListener('click') onMouseClick(event:Event) {
    this.isOpen=!this.isOpen;
  }
}
