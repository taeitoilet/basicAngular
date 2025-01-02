import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { APIResponse } from '../model/interface/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../model/class/LoginRequest';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  requestObj : LoginRequest = new LoginRequest()
  errorMessage = '';
  constructor(private readonly loginService: LoginService, private readonly router: Router, private readonly authService : AuthService) {}

  onLogin(): void {
    this.loginService.login(this.requestObj).subscribe(
      (response : APIResponse) => {
        const token = response.result.token;
        this.loginService.saveToken(token);

        this.router.navigate(['']);
      }
      ,
      (error) => {
        console.error('Đăng nhập thất bại:', error);
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      }
    );
  }

}
