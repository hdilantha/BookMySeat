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

  getBookings(turn_id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append("turn_id", turn_id);
    return this.http.get('http://localhost:3000/bookings/getbookings', { headers: headers, search: params })
      .map(res => res.json());
  }

  // Remove Bookings
  removeBookings(booking) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/bookings/remove', booking, {headers: headers})
      .map(res => res.json());
  }
}
