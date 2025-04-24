import { Injectable } from '@angular/core';
import { Booking, Screening } from '../../models';
import { Observable, retry } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  private screenings: Screening[] = [
    {
      id: 1,
      movieId: 1,
      cinemaId: 1,
      date: '2025-04-25',
      time: '18:00',
      price: 2500
    },
    {
      id: 2,
      movieId: 2,
      cinemaId: 2,
      date: '2025-04-25',
      time: '20:00',
      price: 2500
    },
    {
      id: 3,
      movieId: 3,
      cinemaId: 1,
      date: '2025-04-25',
      time: '10:00',
      price: 2500
    },
    {
      id: 4,
      movieId: 4,
      cinemaId: 3,
      date: '2025-04-26',
      time: '10:00',
      price: 2500
    },
    {
      id: 5,
      movieId: 3,
      cinemaId: 3,
      date: '2025-04-26',
      time: '18:00',
      price: 2500
    },
    {
      id: 6,
      movieId: 4,
      cinemaId: 1,
      date: '2025-04-25',
      time: '18:00',
      price: 2500
    },
    {
      id: 7,
      movieId: 5,
      cinemaId: 2,
      date: '2025-04-25',
      time: '14:00',
      price: 2500
    },
    {
      id: 8,
      movieId: 6,
      cinemaId: 3,
      date: '2025-04-25',
      time: '17:00',
      price: 2500
    },
    {
      id: 9,
      movieId: 7,
      cinemaId: 1,
      date: '2025-04-26',
      time: '22:00',
      price: 2500
    },
    {
      id: 10,
      movieId: 8,
      cinemaId: 2,
      date: '2025-04-26',
      time: '15:00',
      price: 2500
    },
    {
      id: 11,
      movieId: 1,
      cinemaId: 2,
      date: '2025-04-24',
      time: '20:00',
      price: 2500
    }
  ];

  constructor(private client: HttpClient,
    private authService: AuthService
  ) { }
  getAllScreenings(): Screening[] {
    return this.screenings;
  }

  getScreeningById(screeningId: number): Observable<Screening | undefined> {
    const screening = this.screenings.find(s => s.id === screeningId);
    return of(screening);
  }
  

  getScreeningsByMovieId(movieId: number): Observable<Screening[]> {
    const result = this.screenings.filter(s => s.movieId === movieId);
    // return this.screenings.filter(s => s.movieIds.includes(movieId));
    return of(result);
  }
  sortScreeningByTime(screening: Screening[]): Screening[] {
    return screening.sort((a, b) => {
      const timeA = new Date(`${a.date}T${a.time}`).getTime();
      const timeB = new Date(`${b.date}T${b.time}`).getTime();
      return timeA - timeB;
    });
  }
  getUpcomingScreenings(): Observable<Screening[]> {
    const now = new Date();

    const result = this.screenings.filter(s => {
      const screeningDateTime = new Date(`${s.date}T${s.time}`);
      return screeningDateTime > now;
    });
    return of(this.sortScreeningByTime(result));
  }

  bookTicket(booking: Booking): Observable<any>{
  
    return this.client.post<any>('http://127.0.0.1:8000/api/booking/', booking);
  }

 
}
