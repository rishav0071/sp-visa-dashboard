import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const NoWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
};