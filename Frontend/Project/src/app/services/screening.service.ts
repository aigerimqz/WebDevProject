import { Injectable } from '@angular/core';
import { Screening } from '../../models';
import { Observable, retry } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  private screenings: Screening[] = [
    {
      id: 1,
      movieIds: [1, 2],
      cinemaIds: 1,
      date: '2025-04-20',
      time: '18:00'
    },
    {
      id: 2,
      movieIds: [2, 4],
      cinemaIds: 2,
      date: '2025-04-20',
      time: '20:00'
    }
  ];

  constructor() { }
  getAllScreenings(): Screening[] {
    return this.screenings;
  }

  getScreeningsById(screeningId: number): Screening | undefined {
    return this.screenings.find(s => s.id === screeningId);
  }

  getScreeningsByMovieId(movieId: number): Observable<Screening[]> {
    const result = this.screenings.filter(s => s.movieIds.includes(movieId));
    // return this.screenings.filter(s => s.movieIds.includes(movieId));
    return of(result);
  }
}
