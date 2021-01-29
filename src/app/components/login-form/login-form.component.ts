import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginData} from '../../models/loginData';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() onGoingRequest: boolean;
  @Output() login: EventEmitter<LoginData> = new EventEmitter<LoginData>();
  @ViewChild('form') form: FormGroupDirective;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.login.emit(this.loginForm.value);
    this.form.resetForm();
  }
}
