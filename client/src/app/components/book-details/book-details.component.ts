import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ShareService } from '../../services/share.service';
import { TurnService } from '../../services/turn.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  name: String;
  telephone: String;
  email: String;
  turnseats: any;
  seats: String;
  cseats: any;
  flag: boolean;

  constructor(private turnService: TurnService,
    private shareService: ShareService,
    private bookService: BookService,
    private flashMessage: FlashMessagesService,
    private router: Router) {
  }

  ngOnInit() {
    this.flag = false;
    this.turnService.getTurn(localStorage.getItem('turn_id')).subscribe(turn => {
      this.turnseats = turn.seats;
      this.cseats = [[[1,2],[],[3,4]],[[5,6],[],[7,8]],[[9,10],[],[11,12]],[[13,14],[],[15,16]],[[17,18],[],[19,20]],[[21,22],[],[23,24]],[[25,26],[],[27,28]],[[29,30],[],[31,32]],[[33,34],[],[35,36]],[[37,38],[],[39,40]],[[41,42],[],[43,44]],[[45,46],[],[47,48]],[[49,50],[51,52],[53,54]]];
      this.flag = true;
    });
  }



  func(number: Number) {
    if(number < 10) {
      return "0" + number.toString();
    } else {
      return number.toString();
    }
  }

  func1(seat: String) {
    if(seat == "0") {
      return false;
    } else {
      return true;
    }
  }

  chkrs(seat: String) {
    if(seat == "RS") {
      return "true";
    } else {
      return "false";
    }
  }

  genBookingID(seats) {
    return seats.split(" ").join("");
  }

  markSeats(seats, bseats, b_id) {
    bseats = bseats.split(" ");
    bseats.forEach(n => {
      seats[+n - 1] = b_id;
    });
    return seats;
  }

  onClickNext() {
    var seats: any[];

    const booking = {
      booking_id: 'b001',//this.genBookingID(this.seats),
      turn_id: localStorage.getItem('turn_id'),
      name: this.name,
      email: this.email,
      telephone: this.telephone,
      seats: this.seats
    }

    // Validate this!!

    // Mark Seats
    this.turnService.getTurn(localStorage.getItem('turn_id')).subscribe(turn => {
      seats = turn.seats;
      seats = this.markSeats(seats, this.seats, this.genBookingID(this.seats));
      this.turnService.markSeats(localStorage.getItem('turn_id'), seats).subscribe(data => {
        if(data.success) {
          // Register Booking
          this.bookService.registerBooking(booking).subscribe(data => {
            if(data.success) {
              this.flashMessage.show('Booking successful', {cssClass: 'alert-success', timeout: 4000});
              // this.router.navigate(['/addturn']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
              // this.router.navigate(['/addturn']);
            }
          });
        } else {
          this.flashMessage.show('Seats are just got booked by someone', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  result() {
    console.log(localStorage.getItem('turn_id'));
  }
}
