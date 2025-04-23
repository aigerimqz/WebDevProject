import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema, Movie, Screening } from '../../models';
import { CinemasService } from '../services/cinemas.service';
import { MoviesService } from '../services/movies.service';
import { ScreeningService } from '../services/screening.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  movieId: number = 0;
  screeningId: number = 0;
  seatMap: number[][] = []; 
  selectedSeats: { row: number, seat: number }[] = [];
  movie: Movie | undefined;
  cinema: Cinema | undefined;
  screening: Screening | undefined;
  showPaymentForm: boolean = false;

  constructor(private route: ActivatedRoute,
              private cinemasService: CinemasService,
              private moviesService: MoviesService,
              private screeningService: ScreeningService,
              private authService: AuthService,
              private router: Router,
              private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // this.screeningId = Number(this.route.snapshot.paramMap.get('id'));

    
    this.seatMap = Array(4).fill(0).map(() => Array(5).fill(0));
    this.route.paramMap.subscribe(params => {
      this.movieId = +params.get('idMovie')!;
      this.screeningId = +params.get('idScreening')!;

      this.movie = this.moviesService.getMovieById(this.movieId);
      this.screening = this.screeningService.getScreeningsById(this.screeningId);
      if(this.screening){
        this.cinema = this.cinemasService.getCinemaById(this.screening.cinemaId);
      }
    });

    
  }

  toggleSeat(row: number, seat: number): void {
    const index = this.selectedSeats.findIndex(s => s.row === row && s.seat === seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1); 
    } else {
      this.selectedSeats.push({ row, seat });
    }
  }

  isSelected(row: number, seat: number): boolean {
    return this.selectedSeats.some(s => s.row === row && s.seat === seat);
  }


  bookNow(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login'], {
        queryParams: {returnUrl: this.router.url}
      });

    }else{
      this.showPaymentForm = true;
    }
  }

  onPaymentSubmit(form: NgForm){
    if(form.valid && this.selectedSeats.length > 0 && this.screeningId){
      const bookingRequests = this.selectedSeats.map(seat => {
        return {
          screening: this.screeningId,
          seat_row: seat.row + 1,
          seat_num: seat.seat + 1,
          is_paid:true
        };
      });

      bookingRequests.forEach(booking => {
        this.screeningService.bookTicket(booking).subscribe({
          next: () => {
            console.log('Booking is successfull');
          },
          error: err => {
            console.error("Error on booking")
          }
        });
      });
      alert("Tickets booked successfully!")
      this.router.navigate(['/my-bookings']);
    }else{
      alert("Fill out whole form fields");
    }
  }
}
