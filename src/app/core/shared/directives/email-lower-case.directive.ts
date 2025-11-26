import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appEmailCaseDirective]'
})
export class EmailLowerCaseDirective {
    constructor(private elementRef: ElementRef) { }

    @HostListener('input')
    onInput() {
        const inputElement: HTMLInputElement = this.elementRef.nativeElement;
        let trimmedValue = inputElement.value.trim(); // Use to remove blank space from email
        trimmedValue=trimmedValue.toLocaleLowerCase() // Use to convert Uppercase word to lowercase
        if (inputElement.value !== trimmedValue) {
            inputElement.value = trimmedValue;
            inputElement.dispatchEvent(new Event('input'));
        }
    }
}