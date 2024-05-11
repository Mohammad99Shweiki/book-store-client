import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { LoginData } from '../../models/loginData';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() onGoingRequest: boolean;
  @Output() login: EventEmitter<LoginData> = new EventEmitter<LoginData>();
  @ViewChild('form') form: FormGroupDirective;
  userData: any = {}
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.login.emit(this.loginForm.value);
    this.form.resetForm();
  }

  loginUser(): void {
    const data = this.loginForm.value;
    this.authService.loginUser(data).subscribe((response: any) => {
      if (response.token) {
        this.authService.loggedInChange.next(true)
        this.toastr.success('Logged in successfully, redirecting');
        localStorage.setItem('userData', JSON.stringify(response));
        this.router.navigate(['/user']);
      } else {
        let errorMessage: string;
        switch (response.message) {
          case 'password error': {
            errorMessage = 'Wrong password, try again';
            break;
          }
          case 'unexpected error': {
            errorMessage = 'Unexpected error, try again later';
            break;
          }
          case 'user does not exist': {
            errorMessage = 'User does not exist, try again';
            break;
          }
          default: {
            errorMessage = 'Unexpected error, try again later';
            break;
          }
        }
        this.toastr.error(errorMessage);
      }
    });
  }
}
