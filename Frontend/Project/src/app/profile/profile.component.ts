import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { Booking } from '../../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  newUsername: string = '';
  newAvatar: File | null = null;
  bookings: Booking[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if(this.currentUser) {
      this.newUsername = this.currentUser.username;
      this.loadBookings();
    }
  }

  loadBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => this.bookings = bookings,
      error: (err) => console.error('Error loading bookings', err)
    });
  }

  onAvatarChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (this.currentUser) {
        this.currentUser.avatar = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}


  updateProfile() {
    if(!this.currentUser) return;

    const formData = new FormData();
    formData.append('username', this.newUsername);
    if(this.newAvatar) formData.append('avatar', this.newAvatar);

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.patch(`http://127.0.0.1:8000/api/profile/`, formData, { headers }).subscribe({
      next: (user: any) => {
        this.authService.setCurrentUser(user);
        this.currentUser = user;
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Update failed. Try again.';
        this.successMessage = '';
      }
    });
  }
}
