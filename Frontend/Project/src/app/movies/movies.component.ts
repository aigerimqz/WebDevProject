import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
    });

    this.searchService.search$.subscribe(search => {
      const value = search.toLowerCase().trim();

      this.filteredMovies = value
        ? this.movies.filter(movie =>
            movie.title.toLowerCase().includes(value)
          )
        : this.movies;
    });
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
