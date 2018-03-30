import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BusService {
  authToken: any;
  bus: any;

  constructor(private http: Http) { }

  registerBus(bus) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/buses/register', bus, {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getAllBuses() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/buses/allbuses', {headers: headers})
      .map(res => res.json());
  }

  // Edit Bus
  editBus(bus) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/buses/edit', bus, {headers: headers})
      .map(res => res.json());
  }

  // Remove BusService
  removeBus(bus) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/buses/remove', bus, {headers: headers})
      .map(res => res.json());
  }
}
