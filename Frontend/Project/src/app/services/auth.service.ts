import { Injectable } from '@angular/core';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: '12345'

    }
  ]

  private currentUser: User | null = null;

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if(user){
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
  isLoggedIn(): boolean{
    return localStorage.getItem('currentUser') !== null;
  }
  getCurrentUser(): User | null{
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user): null;
  }

  constructor() { }
}
