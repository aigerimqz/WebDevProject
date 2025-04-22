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
  randomMovie: Movie | null = null;
  movies: Movie[] = [];
  cinemas: Cinema[] = [];

  constructor(
    private moviesService: MoviesService,
    private cinemasService: CinemasService
  ){}

  ngOnInit(): void {
      this.movies = this.moviesService.getAllMovies();
      this.cinemas = this.cinemasService.getAllCinemas();

      this.updateRandomMovie();
      setInterval(() => {
        this.updateRandomMovie();    
      }, 5 * 60 * 1000);
    

  }

  updateRandomMovie(): void {
    if(this.movies.length > 0){
      const index = Math.floor(Math.random() * this.movies.length);
      this.randomMovie = this.movies[index];
    } 
  }
  getTopMovies(count: number): Movie[]{
    return this.movies.slice(0, count);
  }
  getTopCinemas(count: number): Cinema[]{
    return this.cinemas.slice(0, count);
  }

  

}
