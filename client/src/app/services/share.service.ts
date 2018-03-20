import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {
  home: any[];
  turn: any[];
  book: any[]

  constructor() { }

  saveHome(data) {
    this.home = data;
  }

  fetchHome() {
    return this.home;
  }

  saveTurn(data) {
    this.turn = data;
  }

  fetchTurn() {
    return this.turn;
  }

  saveBook(data) {
    this.book = data;
  }

  fetchBook() {
    return this.book;
  }
}
