import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class RouteService {
  authToken: any;
  route: any;

  constructor(private http: Http) { }

  registerRoute(route) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/routes/register', route, {headers: headers})
      .map(res => res.json());
  }

  getAllRoutes() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/routes/allroutes', {headers: headers})
      .map(res => res.json());
  }

  getAllCities() {
    return this.http.get('http://localhost:3000/routes/allcities')
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Edit Bus
  editRoute(route) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/routes/edit', route, {headers: headers})
      .map(res => res.json());
  }

  // Remove Route
  removeRoute(route) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/routes/remove', route, {headers: headers})
      .map(res => res.json());
  }
}
