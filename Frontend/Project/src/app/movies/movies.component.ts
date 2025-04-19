import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{
  //just for example i create this part of json 
  movies: Movie[] = []
  constructor(private router: Router, private moviesService: MoviesService){}

  ngOnInit(): void {
    this.movies = this.moviesService.getAllMovies();
  }
  goToDetail(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
