import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private socket!: WebSocket;

  private quotesSubject = new BehaviorSubject<any[]>([]);
  public quotes$ = this.quotesSubject.asObservable();

  private API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {
    this.connectQuotesRealtime();
  }

  private connectQuotesRealtime() {
    this.socket = new WebSocket(`${this.API_URL}/quotes_socket`);

    this.socket.onmessage = (event) => {
      const quotes = JSON.parse(event.data);
      this.quotesSubject.next(quotes);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket closed. Reconnecting...');
      setTimeout(() => this.connectQuotesRealtime(), 2000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.socket.close();
    };
  }

  createQuote(quote: Quote): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(`${this.API_URL}/quotes`, JSON.stringify(quote), {
        headers,
      })
      .pipe(
        map((res) => res),
        catchError((err) => {
          console.error(err);
          return throwError(() => err);
        })
      );
  }

  updateQuote(quote: Quote): Observable<any> {
    console.log(quote.id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .put(`${this.API_URL}/quotes/${quote.id}`, JSON.stringify(quote), {
        headers,
      })
      .pipe(
        map((res) => res),
        catchError((err) => {
          console.error(err);
          return throwError(() => err);
        })
      );
  }

  deleteQuote(quote: Quote) {
    return this.http.delete(`${this.API_URL}/quotes/${quote.id}`);
  }
}
