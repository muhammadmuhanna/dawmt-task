import { Directive, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[appAutoFocus]'
})
export class FocusDirective implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
     this.el.nativeElement.focus();
  }
}
