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
  cinemas: Cinema[] = [];
  screenings: Screening[] = [];
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private screeningService: ScreeningService,
    private cinemasService: CinemasService,
    private router: Router
  ){}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.moviesService.getMovieById(movieId);

    this.screeningService.getScreeningsByMovieId(movieId).subscribe(data => {
      this.screenings = data;
    })

    this.cinemas = this.cinemasService.getAllCinemas();
  }

  getCinemaName(cinemaId: number): string {
    const cinema = this.cinemas.find(c => c.id === cinemaId);
    return cinema ? cinema.name : 'Неизвестно';
  }

  goToBooking(screeningId: number){
    this.router.navigate(['/booking', screeningId]);
  }
  
  

}
