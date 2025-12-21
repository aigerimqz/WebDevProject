import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  email: string;
  avatar?: string;
}

export interface Token {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private client: HttpClient) {}

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  setCurrentUser(user: User) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  this.currentUserSubject.next(user);
}


  login(userModel: User & { password: string }): Observable<Token> {
    return new Observable(observer => {
      this.client.post<Token>('http://127.0.0.1:8000/api/login/', userModel).subscribe({
        next: (token) => {
          localStorage.setItem('token', token.access);
          const user = { username: userModel.username, email: userModel.email };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user); 
          observer.next(token);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  register(data: { username: string; email: string; password: string; password2: string }): Observable<any> {
    return new Observable(observer => {
      this.client.post('http://127.0.0.1:8000/api/register/', data).subscribe({
        next: () => {
          const user = { username: data.username, email: data.email };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          observer.next(true);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
