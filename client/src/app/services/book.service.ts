import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class BookService {

  constructor(private http: Http) { }

  registerBooking(booking) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/bookings/register', booking, {headers: headers})
      .map(res => res.json());
  }
}
