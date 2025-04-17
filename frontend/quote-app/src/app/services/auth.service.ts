import { Injectable } from '@angular/core';
import { UserLogin } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AppConstants } from '../constants/AppConstants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8000';

  private _username$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(AppConstants.TOKEN_KEY);
    const username = localStorage.getItem(AppConstants.USER_KEY);

    if (token && username) {
      this._username$.next(username);
    }
  }

  login(user: UserLogin) {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('scope', '');
    body.set('client_id', '');
    body.set('client_secret', '');

    console.log(body.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post(`${this.API_URL}/token`, body.toString(), {
        headers,
      })
      .subscribe({
        next: (res: any) => {
          const token = res.access_token;
          const username = res.username;
          if (token && username) {
            localStorage.setItem(AppConstants.TOKEN_KEY, token);
            localStorage.setItem(AppConstants.USER_KEY, username);
            this._username$.next(username);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert(err.error?.detail || 'Login failed.');
        },
      });
  }

  registerUser(user: UserLogin) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post(`${this.API_URL}/register_user`, user, {
        headers,
      })
      .subscribe({
        next: (res: any) => {
          const token = res.access_token;
          const username = res.username;
          if (token && username) {
            localStorage.setItem(AppConstants.TOKEN_KEY, token);
            localStorage.setItem(AppConstants.USER_KEY, username);
            this._username$.next(username);
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          if (error.status === 400) {
            console.error('Username already registered!');
            alert(error.error?.detail || 'Username already registered!');
          } else if (error.status === 0) {
            console.error('Network error or server is unreachable');
            alert('Server is unreachable. Please try again later.');
          } else {
            console.error('Unexpected error:', error);
            alert('Something went wrong. Please try again.');
          }
        },
      });
  }

  logout() {
    localStorage.clear();
    this._username$.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem(AppConstants.TOKEN_KEY);
    if (!token) {
      return new BehaviorSubject(false);
    }

    return this.http.get(`${this.API_URL}/verify-token`).pipe(
      map(() => true),
      catchError(() => [false])
    );
  }

  get username$(): Observable<string | null> {
    return this._username$.asObservable();
  }
}
