import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class TurnService {
  authToken: any;
  bus: any;

  constructor(private http: Http) { }

  registerTurn(turn) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/turns/register', turn, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getAllTurns() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/turns/allturns', {headers: headers})
      .map(res => res.json());
  }

  getAllTurnsAdmin() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/turns/allturnsadmin', {headers: headers})
      .map(res => res.json());
  }

  getSearchResults(city1: any, city2: any, date: any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append("starting", city1);
    params.append("destination", city2);
    params.append("date", date);
    return this.http.get('http://localhost:3000/turns/searchturns', { headers: headers, search: params })
      .map(res => res.json());
  }

  getTurn(turn_id: any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append("turn_id", turn_id);
    return this.http.get('http://localhost:3000/turns/getturn', { headers: headers, search: params })
      .map(res => res.json());
  }

  markSeats(turn_id: any, seats: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append("turn_id", turn_id);
    params.append("seats", seats);
    return this.http.get('http://localhost:3000/turns/markseats', { headers: headers, search: params })
      .map(res => res.json());
  }

  // Remove Turn
  removeTurn(turn) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/turns/remove', turn, {headers: headers})
      .map(res => res.json());
  }
}
