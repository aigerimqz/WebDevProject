import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../../models';
import { HttpHeaders } from '@angular/common/http';
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

  private apiUrl = 'http://127.0.0.1:8000/api/booking';


  getMyBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('token');
   

    return this.client.get<Booking[]>(`${this.apiUrl}/my`);
  }

  deleteBooking(id: number): Observable<any> {
    return this.client.delete(`http://127.0.0.1:8000/api/booking/my/${id}/`);
  }
  
}
