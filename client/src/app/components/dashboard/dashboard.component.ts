import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TurnService } from '../../services/turn.service';
import { BusService } from '../../services/bus.service';
import { RouteService } from '../../services/route.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  turns: any;
  bookings: any;
  turn_ids: any[];
  flag: number;

  constructor(private flashMessage: FlashMessagesService,
    private turnService: TurnService,
    private busService: BusService,
    private routeService: RouteService,
    private bookService: BookService,
    private router: Router) {
      this.bookings = new Map();
      this.turns = new Map();
      this.turn_ids = [];
      this.user = JSON.parse(localStorage.getItem('user')).name}

  ngOnInit() {
    this.flag = 0;
    this.turnService.getAllTurns().subscribe(turns => {
      turns.turns.forEach((turn) => {
        this.turn_ids.push(turn.turn_id);
        this.bookService.getBookings(turn.turn_id).subscribe(resp => {
          var booking = resp.bookings;
          this.bookings.set(turn.turn_id, booking);
          this.flag = this.flag + 1;
        });
        this.turns.set(turn.turn_id, turn);
      });
    });
  }

  ready() {
    return this.turns.size == this.flag;
  }

  getTurn(turn_id) {
    return this.turns.get(turn_id);
  }

  getBooking(turn_id) {
    return this.bookings.get(turn_id);
  }

  seatsLeft(seats) {
    var count = 0
    for (var seat of seats) {
      if (seat == "0") {
        count = count + 1;
      }
    }
    return count - 1;
  }

  len(arr: any[]) {
    return arr.length;
  }

  getTotalProfit() {
    var total = 0;
    this.turn_ids.forEach(turn_id => {
      var price = this.turns.get(turn_id).price;
      this.bookings.get(turn_id).forEach(booking => {
        total = total + (this.len(booking.seats) * price);
      });
    });
    return total;
  }

  getProfit(turn_id) {
    var total = 0;
    var price = this.turns.get(turn_id).price;
    this.bookings.get(turn_id).forEach(booking => {
      total = total + (this.len(booking.seats) * price);
    });
    return total;
  }

  getTotalBookings() {
    var total = 0;
    this.turn_ids.forEach(turn_id => {
      this.bookings.get(turn_id).forEach(booking => {
        total = total + 1;
      });
    });
    return total;
  }

  getTotalTurns() {
    var total = 0;
    this.turn_ids.forEach(turn_id => {
      total = total + 1;
    });
    return total;
  }

  getPrice(price: any) {
    price = price.toString();
    if (price.indexOf('.') > -1) {
      var arr = price.split(".")[1]
      if (arr.length == 0) {
        return price + "00"
      }
      if (arr.length == 1) {
        return price + "0"
      }
    }
    return price + ".00"
  }

  analogToDigital(time: String) {
    var arr = time.split(":");
    if (+arr[0] > 11) {
      var res = (+arr[0] - 12).toString() + ":" + arr[1] + " PM";
      return res;
    } else if (arr[0] == "00") {
      var res = 12 + ":" + arr[1] + " AM";
      return res;
    } else {
      var res = time + " AM";
      return res;
    }

  }

}
