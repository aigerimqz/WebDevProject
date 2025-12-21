import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from './services/auth.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User | null = null;
  searchText: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
  }

  onSearchChange(): void {
    this.searchService.setSearch(this.searchText);

    
    if (this.router.url !== '/movies') {
      this.router.navigate(['/movies']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
