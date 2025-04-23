import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private client: HttpClient
  ) { }

  createBooking(data: any): Observable<any>{
    return this.client.post('http://127.0.0.1:8000/api/booking/', data);
  }
}
