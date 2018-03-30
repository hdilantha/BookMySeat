import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {}

  // Register User
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  // Edit User
  editUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/edit', user, {headers: headers})
      .map(res => res.json());
  }

  // Edit User
  changePassword(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/change', user, {headers: headers})
      .map(res => res.json());
  }

  // Login Authenticate
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  // Change Authenticate
  authenticateChange(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticatechange', user, {headers: headers})
      .map(res => res.json());
  }

  // Get User Profile
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  // Get all the Users
  getAllUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/allusers', {headers: headers})
      .map(res => res.json());
  }

  // Store User Data in Local Storage
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Load Token
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Check token validity
  loggedIn() {
    return tokenNotExpired("id_token");
  }

  // User Logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Remove User
  removeUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/remove', user, {headers: headers})
      .map(res => res.json());
  }

}
