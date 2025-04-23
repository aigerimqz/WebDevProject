import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Cinema, Movie } from '../../models';
import { MoviesService } from '../services/movies.service';
import { CinemasService } from '../services/cinemas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  movies: Movie[] = [];
  cinemas: Cinema[] = [];
  currentMovieIndex: number = 0;


  constructor(
    private moviesService: MoviesService,
    private cinemasService: CinemasService
  ){}

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe({
      next: data => this.movies = data,
      error: err => console.error("Error")
    })
    // this.movies = this.moviesService.getAllMovies();
    this.cinemasService.getAllCinemas().subscribe({
      next: data => this.cinemas = data,
      error: err => console.error("Error")
    })
    this.movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    
    

  }

  
  getTopMovies(count: number): Movie[]{
    return this.movies.slice(0, count);
  }
  getTopCinemas(count: number): Cinema[]{
    return this.cinemas.slice(0, count);
  }

  changeBanner(direction: string): void{
    if(direction === 'next'){
      this.currentMovieIndex = (this.currentMovieIndex + 1) % this.movies.length;

    }
    else if(direction === 'prev'){
      this.currentMovieIndex = (this.currentMovieIndex - 1 + this.movies.length);
    }
  }
  getCurrentBannerMovie(): Movie {
    return this.movies[this.currentMovieIndex];
  }

  

}
