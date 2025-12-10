import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,          
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.password2) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const newUser = { 
      username: this.name, 
      email: this.email, 
      password: this.password,
      password2: this.password2 
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
      
        this.router.navigateByUrl('/');
      },
      error: () => this.errorMessage = 'Registration failed. Try again.'
    });
  }
}
