import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {passwordNotMatches, passwordValidator} from '../../helpers/validators';
import {RegisterData} from '../../models/registerData';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() onGoingRequest: boolean;
  @Output() register: EventEmitter<RegisterData> = new EventEmitter<RegisterData>();
  @ViewChild('form') form: FormGroupDirective;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
    this.registerForm.setValidators(passwordNotMatches());
  }

  onSubmit(): void {
    this.register.emit(this.registerForm.value);
    this.form.resetForm();
  }

}
