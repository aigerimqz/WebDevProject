import { Injectable } from '@angular/core';
import { Cinema } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {
  private cinemas: Cinema[] = [
    {
      id: 1,
      name: "Lumeria Cinema",
      location: "Abylaikhan 62"
    },
    {
      id: 2,
      name: "Chaplin Mega Park",
      location: "Makatayev 21"
    }
  ]

  constructor() { }

  getAllCinemas(): Cinema[]{
    return this.cinemas;
  }
  getCinemaById(id: number): Cinema | undefined {
    return this.cinemas.find(cinema => cinema.id === id);
  }
}
