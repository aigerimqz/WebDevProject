import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,            // <-- важно
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onRegister() {
    const newUser = { name: this.name, email: this.email, password: this.password };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => this.switchToLogin.emit(), 800);
      },
      error: () => this.errorMessage = 'Registration failed. Try again.'
    });
  }

  goToLogin() {
    this.switchToLogin.emit();
  }
}
