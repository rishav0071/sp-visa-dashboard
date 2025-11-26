import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appNoLeadingSpaceDirective]'
})
export class NoLeadingSpaceDirective {
    constructor(private elementRef: ElementRef) { }

    @HostListener('input')
    onInput() {
        const inputElement: HTMLInputElement = this.elementRef.nativeElement;
        let trimmedValue = inputElement.value.replace(/^\s+/, '');
        if (inputElement.value !== trimmedValue) {
            inputElement.value = trimmedValue;
            inputElement.dispatchEvent(new Event('input'));
        }
    }
}