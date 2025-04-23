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
    this.moviesService.getAllMovies().subscribe({
      next: data => this.movies = data,
      error: err => console.log("Error loading movie", err)
    })
  }
  goToDetail(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
