import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { User } from '../models';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(){
    this.currentUser = this.authService.getCurrentUser();
  }
  logout(){
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }
}
