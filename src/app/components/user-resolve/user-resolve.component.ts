import {Component, OnInit} from '@angular/core';
import {LoginData} from '../../models/loginData';
import {RegisterData} from '../../models/registerData';
import {AuthService} from '../../services/auth/auth.service';
import {LoginResponse} from '../../models/loginResponse';
import {AuthResponse} from '../../models/authResponse';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-resolve',
  templateUrl: './user-resolve.component.html',
  styleUrls: ['./user-resolve.component.css']
})
export class UserResolveComponent implements OnInit {
  onGoingRequest: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(data: RegisterData): void {
    this.onGoingRequest = true;
    this.authService.registerUser(data).subscribe((response: AuthResponse) => {
      if (response.success) {
        this.toastr.success('Registered successfully, you can login now');
      } else {
        let errorMessage: string;

        switch (response.message) {
          case 'unexpected error': {
            errorMessage = 'Unexpected error, try again later';
            break;
          }
          case 'user exists': {
            errorMessage = 'User exists already, you can login';
            break;
          }
          case 'validation error': {
            errorMessage = 'Validation error, check your data and try again';
            break;
          }
          default: {
            errorMessage = 'Unexpected error, try again later';
            break;
          }
        }
        this.toastr.error(errorMessage);
      }
      this.onGoingRequest = false;
    });
  }

  loginUser(data: LoginData): void {
    this.onGoingRequest = true;
    this.authService.loginUser(data).subscribe((response: LoginResponse) => {
      this.onGoingRequest = false;
      if (response.success) {
        this.toastr.success('Logged in successfully, redirecting');
        localStorage.setItem('userData', JSON.stringify(response.data));
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
