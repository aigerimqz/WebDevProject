import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: "Captain America: Brave New World",
      description: "Новый президент США Таддеус Росс решает назначить Капитана Америку на официальную должность. Но в прошлом между ними были разногласия, и Сэм сомневается, что это хорошая идея. Этим же вечером на президента совершается покушение. Уилсон уверен, что предатель скрывается среди ближайшего окружения Росса.",
      genre: 'action',
      release_year: 2025,
      release_date: '10-04-2025',
      image_url: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_.jpg',
      duration: '1 hr. 41 min.',
      banner: 'https://image.tmdb.org/t/p/w1280/jhL4eTpccoZSVehhcR8DKLSBHZy.jpg'

    },
    {
      id: 2,
      title: "Captain America: Brave New World",
      description: "Новый президент США Таддеус Росс решает назначить Капитана Америку на официальную должность. Но в прошлом между ними были разногласия, и Сэм сомневается, что это хорошая идея. Этим же вечером на президента совершается покушение. Уилсон уверен, что предатель скрывается среди ближайшего окружения Росса.",
      genre: 'action',
      release_year: 2025,
      release_date: '10-01-2025',
      image_url: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_.jpg',
      duration: '1 hr. 41 min.',
      banner: 'https://image.tmdb.org/t/p/w1280/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg'

    },
    {
      id: 3,
      title: "Captain America: Brave New World",
      description: "Новый президент США Таддеус Росс решает назначить Капитана Америку на официальную должность. Но в прошлом между ними были разногласия, и Сэм сомневается, что это хорошая идея. Этим же вечером на президента совершается покушение. Уилсон уверен, что предатель скрывается среди ближайшего окружения Росса.",
      genre: 'action',
      release_year: 2025,
      release_date: '05-04-2025',
      image_url: 'https://m.media-amazon.com/images/M/MV5BNDRjY2E0ZmEtN2QwNi00NTEwLWI3MWItODNkMGYwYWFjNGE0XkEyXkFqcGc@._V1_.jpg',
      duration: '1 hr. 41 min.',
      banner: 'https://image.tmdb.org/t/p/w1280/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg'

    },
   
  ]
  private apiUrl = ''


  constructor(private client: HttpClient) { }

  // getAllMovies(): Observable<Movie[]> {
  //   return this.client.get<Movie[]>(this.apiUrl);
  // }
  // getMovieById(id: number): Observable<Movie> {
  //   return this.client.get<Movie>(`${this.apiUrl}${id}/`);
  // }

  getAllMovies(): Movie[]{
    return this.movies;
  }
  getMovieById(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }
}
