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
      movieId: 1,
      cinemaId: 1,
      date: '2025-04-22',
      time: '18:00',
      price: 2500
    },
    {
      id: 2,
      movieId: 2,
      cinemaId: 2,
      date: '2025-04-22',
      time: '20:00',
      price: 2500
    },
    {
      id: 3,
      movieId: 2,
      cinemaId: 1,
      date: '2025-04-22',
      time: '10:00',
      price: 2500
    },
    {
      id: 4,
      movieId: 2,
      cinemaId: 1,
      date: '2025-04-21',
      time: '23:07',
      price: 2500
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
    const result = this.screenings.filter(s => s.movieId === movieId);
    // return this.screenings.filter(s => s.movieIds.includes(movieId));
    return of(result);
  }
  
  getUpcomingScreenings(): Observable<Screening[]> {
    const now = new Date();

    const result = this.screenings.filter(s => {
      const screeningDateTime = new Date(`${s.date}T${s.time}`);
      return screeningDateTime > now;
    });
    return of(result);
  }

  sortScreeningByTime(screening: Screening[]): Screening[]{
    return screening.sort((a, b) => {
      const timeA = new Date('1970-01-01T' + a.date + 'Z').getTime();
      const timeB = new Date('1970-01-01T' + b.date + 'Z').getTime();
      return timeA - timeB;
    })
  }
}
