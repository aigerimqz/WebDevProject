import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User, Token } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userModel: User & { password: string } = { username: '', email: '', password: '' };
  errorMessage: string = '';
  returnUrl: string = '/';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.userModel).subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: () => this.errorMessage = 'Wrong username or password'
    });
  }
}
