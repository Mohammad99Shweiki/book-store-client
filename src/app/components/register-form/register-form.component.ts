import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordNotMatches, passwordValidator} from '../../helpers/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() onGoingRequest: boolean;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
    this.registerForm.setValidators(passwordNotMatches());
  }

  onSubmit(): void {

  }

}
