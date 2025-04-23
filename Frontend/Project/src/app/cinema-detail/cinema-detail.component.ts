import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cinema, Movie, Screening } from '../../models';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { ScreeningService } from '../services/screening.service';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-cinema-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cinema-detail.component.html',
  styleUrls: ['./cinema-detail.component.css']
})
export class CinemaDetailComponent implements OnInit, OnDestroy {
  cinemaId: number = 0;
  cinema: Cinema | undefined;
  screenings: Screening[] = [];
  movies: Movie[] = [];
  upcomingScreenings: Screening[] = [];
  movieMap: { [key: number]: Movie } = {};
  loading: boolean = true;
  errorMessage: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private cinemasService: CinemasService,
    private screeningService: ScreeningService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.cinemaId = Number(this.route.snapshot.paramMap.get('id'));

    
    const cinemaSub = this.cinemasService.getCinemaById(this.cinemaId).subscribe({
      next: data => {
        this.cinema = data;
        this.loading = false;
      },
      error: err => {
        console.error("Error loading cinema", err);
        this.errorMessage = 'Failed to load cinema details.';
        this.loading = false;
      }
    });
    this.subscriptions.push(cinemaSub);

    const allScreenings = this.screeningService.getAllScreenings();
    this.screenings = allScreenings.filter(s => s.cinemaId === this.cinemaId);

 
    const movieRequests = this.screenings.map(s => this.moviesService.getMovieById(s.movieId));

    const movieSub = forkJoin(movieRequests).subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
        this.movieMap = movies.reduce((map, movie) => {
          map[movie.id] = movie;
          return map;
        }, {} as { [key: number]: Movie });
      },
      error: err => {
        console.error("Error loading movies", err);
        this.errorMessage = 'Failed to load movie details.';
      }
    });
    this.subscriptions.push(movieSub);

   
    const upcomingSub = this.screeningService.getUpcomingScreenings().subscribe({
      next: screenings => {
        this.upcomingScreenings = screenings
          .filter(screening => screening.cinemaId === this.cinemaId)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      error: err => {
        console.error("Error loading upcoming screenings", err);
        this.errorMessage = 'Failed to load upcoming screenings.';
      }
    });
    this.subscriptions.push(upcomingSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getMovieById(movieId: number): Movie | undefined {
    return this.movieMap[movieId];
  }
}
