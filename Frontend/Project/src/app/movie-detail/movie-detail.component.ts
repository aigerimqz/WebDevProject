import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Cinema, Movie, Screening } from '../../models';
import { ScreeningService } from '../services/screening.service';
import { CinemasService } from '../services/cinemas.service';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit{
  movie: Movie | undefined;
  movieId: number = 0;
  loading: boolean = true;
  cinemas: Cinema[] = [];
  screenings: Screening[] = [];
  upcomingScreenings: Screening[] = [];
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private screeningService: ScreeningService,
    private cinemasService: CinemasService,
    private router: Router
  ){}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesService.getMovieById(this.movieId).subscribe({
      next: data => this.movie = data,
      error: err => console.error("Error loading movie-detail")
    })

    // this.screeningService.getScreeningsByMovieId(movieId).subscribe(data => {
    //   this.screenings = data;
    // })

    this.cinemas = this.cinemasService.getAllCinemas();

    
    // this.screeningService.getUpcomingScreenings().subscribe(screenings => {
    //   this.upcomingScreenings = screenings
    //     .filter(screening => screening.movieId === movieId)
    //     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // });

    this.screeningService.getUpcomingScreenings().subscribe(screenings => {
      this.upcomingScreenings = screenings
        .filter(screening => screening.movieId === movieId); 
    });

    
  }

  getCinemaName(cinemaId: number): string {
    const cinema = this.cinemas.find(c => c.id === cinemaId);
    return cinema ? cinema.name : 'Undefined';
  }

  goToBooking(screeningId: number): void{
    if(this.movie){
      this.router.navigate(['/movies', this.movie.id, 'booking', screeningId]);
    }
    
  }
  
  

}
