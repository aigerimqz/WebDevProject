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
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  movieId: number = 0;
  cinemaId: number = 0;
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

      this.moviesService.getMovieById(this.movieId).subscribe({
        next: data => this.movie = data,
        error: err => console.error('Error on getting movie', err)
      });
      this.screeningService.getScreeningById(this.screeningId).subscribe(s => {
        this.screening = s;
        if (this.screening) {
          const dateTime = new Date(`${this.screening.date}T${this.screening.time}`);
          console.log('screening loaded', this.screening);
      
         
          this.cinemasService.getCinemaById(this.screening.cinemaId).subscribe(cinema => {
            this.cinema = cinema;
            console.log('Cinema loaded:', cinema);
          });
        } else {
          console.log('Screening not found');
        }
      });
      

      
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
    console.log("Is Logged In?", this.authService.isLoggedIn());
    console.log("Token", this.authService.getToken());
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
          seat_number: seat.seat + 1
        };
      });

      bookingRequests.forEach(booking => {
        this.screeningService.bookTicket(booking).subscribe({
          next: () => {
            console.log('Booking is successfull');
          },
          error: err => {
            console.error("Error on booking", err);
            alert("Error on booking. Try later");
          }
        });
      });
      alert("Tickets booked successfully!")
      this.selectedSeats = [];
      this.router.navigate(['/my-bookings']);
    }else{
      alert("Fill out whole form fields");
    }
  }
}
