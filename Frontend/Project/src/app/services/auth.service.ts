import { Injectable } from '@angular/core';
import { User, Token } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private client: HttpClient) { }


  login(userModel: User): Observable<Token>{
    return new Observable(observer => {
      this.client.post<Token>('http://127.0.0.1:8000/api/login/', userModel).subscribe({
        next: (token) => {
          localStorage.setItem('token', token.access);
          observer.next(token);
          observer.complete();
        },
        error: err => observer.error(err)
      })
    })
  }

  
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.client.post('http://127.0.0.1:8000/api/register/', data);
  }


  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null{
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user): null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
