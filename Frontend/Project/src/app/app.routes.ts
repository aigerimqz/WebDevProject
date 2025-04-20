import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'cinemas', component: CinemasComponent},
    {path: 'movies/:id', component: MovieDetailComponent},
    {path: 'booking/:id', component: BookingComponent}
];
