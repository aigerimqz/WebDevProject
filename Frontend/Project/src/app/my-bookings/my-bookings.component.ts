import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { ScreeningService } from '../services/screening.service';
import { MoviesService } from '../services/movies.service';
import { Screening } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    private screeningService: ScreeningService,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe(bookings => {
      this.bookings = bookings.map(booking => ({
        ...booking,
        movieTitle: '',
        movieImage: '',
        date: '',
        time: '',
        price: 0
      }));

      this.bookings.forEach(booking => {
        this.screeningService.getScreeningById(booking.screening).subscribe(screening => {
          if (screening) {  // Add null check
            booking.date = screening.date;
            booking.time = screening.time;
            booking.price = screening.price;

            this.movieService.getMovieById(screening.movieId).subscribe(movie => {
              if (movie) {  // Add null check
                booking.movieTitle = movie.title;
                booking.movieImage = movie.image_url;
              }
            });
          }
        });
      });
    });
  }


  deleteBooking(id: number): void {
    if (confirm('Are you sure to delete your ticket?')) {
      this.bookingService.deleteBooking(id).subscribe(() => {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
      });
    }
  }
  
}