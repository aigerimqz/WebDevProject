import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = ''


  constructor(private client: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this.client.get<Movie[]>(this.apiUrl);
  }
  getMovieById(id: number): Observable<Movie> {
    return this.client.get<Movie>(`${this.apiUrl}${id}/`);
  }
}
