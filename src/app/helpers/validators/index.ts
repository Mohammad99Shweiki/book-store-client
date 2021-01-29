import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ?
      null : {passwordValidator: 'mehPassword'};
  };
}

export function passwordNotMatches(): ValidatorFn {
  return (formGroup: FormGroup): {[key: string]: any} | null => {
    return formGroup.controls.password.value === formGroup.controls.confirmPassword.value ? null : {passwordMatches: true};
  };
}
