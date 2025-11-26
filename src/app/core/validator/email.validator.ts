import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { EMAIL_REGEX } from '../shared/regexes';


export const ValidateEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  let regularExp = EMAIL_REGEX;
  let cValue = control.value;
  cValue = (cValue || '').toString().trim();
  if (!cValue)
    return { required: true };

  return regularExp.test(cValue) ? null : {
    invalidEmail: true 
  };
    

};