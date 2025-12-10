import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, Token } from '../../models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userModel: User;


  errorMessage: string = '';
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userModel = {} as User;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    this.authService.login(this.userModel).subscribe({
      next: (token) => {
        localStorage.setItem('access', token.access);
        localStorage.setItem('refresh', token.refresh);
        this.router.navigateByUrl(this.returnUrl);
      },
      error: () => {
        this.errorMessage = 'Wrong username or password';
      }
    });
  }
  
}
