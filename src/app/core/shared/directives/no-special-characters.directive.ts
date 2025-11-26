import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noSpecialCharacters]'
})
export class NoSpecialCharactersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[!@#$%^&*(),.?":{}|<>]/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
