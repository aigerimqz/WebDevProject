import { Component, OnInit } from '@angular/core';
import { Cinema, Movie, Screening } from '../../models';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CinemasService } from '../services/cinemas.service';
import { ScreeningService } from '../services/screening.service';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cinema-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cinema-detail.component.html',
  styleUrl: './cinema-detail.component.css'
})
export class CinemaDetailComponent implements OnInit{
  cinemaId: number = 0;
  cinema: Cinema | undefined;
  screenings: Screening[] = [];
  movies: any;
  upcomingScreenings: Screening[] = [];
  movieMap: {[key: number]: Movie} = {};
  constructor(
    private route: ActivatedRoute,
    private cinemasService: CinemasService,
    private screeningService: ScreeningService,
    private moviesService: MoviesService
  ){}
  
  ngOnInit(): void {
    this.cinemaId = +this.route.snapshot.paramMap.get('id')!;
    this.cinema = this.cinemasService.getCinemaById(this.cinemaId);

    const allScreenings = this.screeningService.getAllScreenings();
    this.screenings = allScreenings.filter(s => s.cinemaId === this.cinemaId);

    this.movies = this.screenings.map(s => {
      const movieId = s.movieId;
      return this.moviesService.getMovieById(movieId);
    });


    

    this.screeningService.getUpcomingScreenings().subscribe(screenings => {
      this.upcomingScreenings = screenings
        .filter(screening => screening.cinemaId === this.cinemaId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
    });

      
  }



  getMovieById(movieId: number): Movie | undefined {
    return this.movieMap[movieId];
  }
  
}
