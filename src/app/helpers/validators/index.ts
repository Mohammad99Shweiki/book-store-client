import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ? null : {passwordValidator: 'mehPassword'};
  };
}

export function passwordNotMatches(): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    return formGroup.controls.password.value === formGroup.controls.confirmPassword.value ? null : {passwordMatches: true};
  };
}
