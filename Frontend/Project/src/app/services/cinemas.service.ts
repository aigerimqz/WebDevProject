import { Injectable } from '@angular/core';
import { Cinema } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {
  // private cinemas: Cinema[] = [
  //   {
  //     id: 1,
  //     name: "Lumeria Cinema",
  //     location: "Abylaikhan 62",
  //     image_url: "https://chocolife.object.pscloud.io/static/upload/images/deal/for_deal_page/36000/35819/660x305/6_201704281040414933542248489.jpg?1724131235"
  //   },
  //   {
  //     id: 2,
  //     name: "Chaplin Mega Park",
  //     location: "Makatayev 21",
  //     image_url: "https://new.chaplin.kz/images/cinemas/Chaplin%20Mega%20Alma-Ata/10.webp"
  //   }
  // ]
  private apiUrl = "http://127.0.0.1:8000/api/cinema/";
  constructor(private client: HttpClient) { }


  getAllCinemas(): Observable<Cinema[]> {
    return this.client.get<Cinema[]>(this.apiUrl);
  }
  getCinemaById(id: number): Observable<Cinema> {
    return this.client.get<Cinema>(`${this.apiUrl}${id}`);
  }

  // getAllCinemas(): Cinema[]{
  //   return this.cinemas;
  // }
  // getCinemaById(id: number): Cinema | undefined {
  //   return this.cinemas.find(cinema => cinema.id === id);
  // }


}
