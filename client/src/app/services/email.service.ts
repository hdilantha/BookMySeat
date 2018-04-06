import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class EmailService {

  constructor(private http: Http) { }

  sendMail(msg) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/email/send', msg, {headers: headers})
      .map(res => res.json());
  }
}
