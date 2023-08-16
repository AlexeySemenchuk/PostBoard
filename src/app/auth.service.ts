import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {
    const savedState = localStorage.getItem('isAuthenticated');
    if (savedState) {
      this.isAuthenticated = JSON.parse(savedState);
    }
  }

  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    //need use API from BackEnd and use Token
    if (username === 'admin' && password === 'root') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
