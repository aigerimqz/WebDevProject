import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { User } from '../../models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '/';
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void{
    const success  = this.authService.login(this.email, this.password);
    if(success){
      this.router.navigateByUrl(this.returnUrl);
    }else{
      this.errorMessage = 'Wrong email or password';
    }
  }

  


}
