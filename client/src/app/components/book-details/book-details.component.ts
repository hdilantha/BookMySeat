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
  nic: String;
  turnseats: any;
  seats: String;
  cseats: any;
  flag: boolean;

  constructor(private turnService: TurnService,
    private shareService: ShareService,
    private bookService: BookService,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router) {
  }

  ngOnInit() {
    this.flag = false;
    this.turnService.getTurn(localStorage.getItem('turn_id')).subscribe(turn => {
      this.turnseats = turn.seats;
      // this.cseats = [[[1,2],[],[3,4]],[[5,6],[],[7,8]],[[9,10],[],[11,12]],[[13,14],[],[15,16]],[[17,18],[],[19,20]],[[21,22],[],[23,24]],[[25,26],[],[27,28]],[[29,30],[],[31,32]],[[33,34],[],[35,36]],[[37,38],[],[39,40]],[[41,42],[],[43,44]],[[45,46],[],[47,48]],[[49,50],[51,52],[53,54]]];
      // this.cseats = [[[1],[5],[9],[13],[17],[21],[25],[29],[33],[37],[41],[45],[49]],[[2],[6],[10],[14],[18],[22],[26],[30],[34],[38],[42],[26],[50]],[[],[],[],[],[],[],[],[],[],[],[],[],[51]],[[],[],[],[],[],[],[],[],[],[],[],[],[52]],[[3],[7],[11],[15],[19],[23],[27],[31],[35],[39],[43],[47],[53]],[[4],[8],[12],[16],[20],[24],[28],[32],[36],[40],[44],[48],[54]]];
      this.cseats =[[[1],[5],[9],[13],[17],[21],[25],[29],[33],[37],[41],[43]],[[2],[6],[10],[14],[18],[22],[26],[30],[34],[38],[42],[44]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[45]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[46]],[[3],[7],[11],[15],[19],[23],[27],[31],[35],[39],[0],[47]],[[4],[8],[12],[16],[20],[24],[28],[32],[36],[40],[0],[48]]];
      // this.cseats =[[[49],[45],[41],[37],[33],[29],[25],[21],[17],[13],[9],[5],[1]],[[50],[46],[42],[38],[34],[30],[26],[22],[18],[14],[10],[6],[2]],[[51],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[52],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[53],[47],[43],[39],[35],[31],[27],[23],[19],[15],[11],[7],[3]],[[54],[48],[44],[40],[36],[32],[28],[24],[20],[16],[12],[8],[4]]];
      this.flag = true;
    });
  }



  func(number: Number) {
    if (number == 0) {
      return " ";
    }
    else if(number < 10) {
      return "0" + number.toString();
    } else{
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

  getSeats(seat) {
    var seatList = [];
    seat = seat.toString();
    if (this.seats != undefined) {
        seatList = this.seats.split(" ");
    }
    if(seatList.indexOf(seat) > -1) {
      seatList.splice(seatList.indexOf(seat), 1);
    } else {
      seatList.push(seat);
    }
    this.seats = seatList.join(" ");
  }

  genBookingID(seats) {
    return seats.split(" ").join("") + this.nic;
  }

  markSeats(seats, bseats, b_id) {
    bseats = bseats.split(" ");
    bseats.forEach(n => {
      seats[+n] = b_id;
    });
    return seats;
  }

  onClickNext() {
    var seats: any[];

    const booking = {
      booking_id: "b1",
      turn_id: localStorage.getItem('turn_id'),
      name: this.name,
      email: this.email,
      telephone: this.telephone,
      nic: this.nic,
      seats: this.seats
    }

    // Required Fields
    if(!this.validateService.validateBooking(booking)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(booking.email)) {
      this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Telephone
    if(!this.validateService.validateTelephone(booking.telephone)) {
      this.flashMessage.show('Please enter valid telephone number', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Seat Selection
    if (this.seats == undefined) {
      this.flashMessage.show('Please select seats', {cssClass: 'alert-danger', timeout: 3000});
      return false;
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
              // this.router.navigate(['/addturn']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
              // this.router.navigate(['/addturn']);
            }
          });
        } else {
          this.flashMessage.show('Selected seats were just got booked', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    });
  }

  result() {
    console.log(localStorage.getItem('turn_id'));
  }
}
