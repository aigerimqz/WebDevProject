import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { BookingComponent } from './booking/booking.component';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';
import { AuthComponent } from './auth/auth.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movies', component: MoviesComponent},
    {path: 'movies/:id', component: MovieDetailComponent},
    {path: 'movies/:idMovie/booking/:idScreening',
        loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent)},

    {path: 'cinemas', component: CinemasComponent},
    {path: 'cinemas/:id', component: CinemaDetailComponent},
    {path: 'login', component: AuthComponent},
    {path: 'my-bookings', component: MyBookingsComponent}
];
