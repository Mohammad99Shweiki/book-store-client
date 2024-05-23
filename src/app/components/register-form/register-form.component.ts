import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { passwordNotMatches } from '@/helpers/validators';
import { RegisterData } from '@/models/registerData';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm.setValidators(passwordNotMatches());
  }

  registerUser(): void {
    const data = this.form.value;
    delete data['confirmPassword'];

    this.authService.registerUser(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastr.success('Registered successfully, you can login now', '', { positionClass: 'toast-top-center' });
      },
      error: (response: any) => {
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
    });
    this.form.resetForm();
  }

}
