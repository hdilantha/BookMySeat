import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TurnService } from '../../services/turn.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  name: String;
  telephone: String;
  email: String;
  nic: String;
  turnseats: any;
  seats: String;
  cseats: any;
  price: String
  flag: boolean;

  tprice: any;
  bcharge: any;
  total: any;
  starting: String;
  destination: String;
  date: String;
  stime: String;

  constructor(private turnService: TurnService,
    private bookService: BookService,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit() {
    this.flag = false;
    if (localStorage.getItem('name') === null) {
      this.router.navigate(['/']);
    }
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.telephone = localStorage.getItem('telephone');
    this.nic = localStorage.getItem('nic');
    this.seats = localStorage.getItem('seats');
    this.price = localStorage.getItem('price');

    this.starting = localStorage.getItem('starting');
    this.destination = localStorage.getItem('destination');
    this.date = localStorage.getItem('date');
    this.stime = localStorage.getItem('stime');
    this.calcBill();
    this.flag = true;
  }

  calcBill() {
    this.tprice = this.len(this.seats) * (+this.price);
    this.bcharge = this.len(this.seats) * 120;
    this.total = this.len(this.seats) * (+this.price) + this.len(this.seats) * 120;
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

  len(arr: String) {
    var arr1 = arr.trim().split(" ");
    return arr1.length;
  }

  func(price: any) {
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

  markSeats(seats, bseats, b_id) {
    bseats = bseats.split(" ");
    bseats.forEach(n => {
      seats[+n] = b_id;
    });
    return seats;
  }

  genBookingID() {
    var bid = this.seats.split(" ").join("") + this.nic;
    return bid;
  }
  onClickPay() {
    var seats: any[];

    const booking = {
      booking_id: this.genBookingID(),
      turn_id: localStorage.getItem('turn_id'),
      name: this.name,
      email: this.email,
      telephone: this.telephone,
      nic: this.nic,
      seats: this.seats
    }

    // Mark Seats
    this.turnService.getTurn(localStorage.getItem('turn_id')).subscribe(turn => {
      seats = turn.seats;
      seats = this.markSeats(seats, this.seats, this.nic);
      this.turnService.markSeats(localStorage.getItem('turn_id'), seats).subscribe(data => {
        if(data.success) {
          // Register Booking
          this.bookService.registerBooking(booking).subscribe(data => {
            if(data.success) {
              this.flashMessage.show('Booking successful', {cssClass: 'alert-success', timeout: 4000});
              localStorage.clear();
              this.router.navigate(['/']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
              // this.router.navigate(['/addturn']);
            }
          });
        } else {
          this.flashMessage.show('Selected seats were just got booked', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/bookdetail']);
        }
      });
    });
  }
}
