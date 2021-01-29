import { Component, OnInit } from '@angular/core';
import {LoginData} from '../../models/loginData';
import {RegisterData} from '../../models/registerData';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-resolve',
  templateUrl: './user-resolve.component.html',
  styleUrls: ['./user-resolve.component.css']
})
export class UserResolveComponent implements OnInit {
  onGoingRequest: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(data: RegisterData): void {
    this.onGoingRequest = true;
    this.authService.registerUser(data).subscribe((response: string) => {
      this.onGoingRequest = false;
    });
  }

  loginUser(data: LoginData): void {
    this.onGoingRequest = true;
    this.authService.loginUser(data).subscribe((response: string) => {
      this.onGoingRequest = false;
    });
  }
}
