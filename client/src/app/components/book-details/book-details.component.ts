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
  name: string;
  telephone: string;
  email: string;
  nic: string;
  turnseats: any;
  seats: string;
  cseats: any;
  flag: boolean;
  price: string;
  stime: string;

  constructor(private turnService: TurnService,
    private shareService: ShareService,
    private bookService: BookService,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router) {
  }

  ngOnInit() {
    this.flag = false;
    if (localStorage.getItem('turn_id') === null) {
      this.router.navigate(['/']);
    }
    this.turnService.getTurn(localStorage.getItem('turn_id')).subscribe(turn => {
      this.turnseats = turn.seats;
      this.price = turn.price;
      this.stime = turn.stime;
      this.cseats =[[[1],[5],[9],[13],[17],[21],[25],[29],[33],[37],[41],[43]],[[2],[6],[10],[14],[18],[22],[26],[30],[34],[38],[42],[44]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[45]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[46]],[[3],[7],[11],[15],[19],[23],[27],[31],[35],[39],[0],[47]],[[4],[8],[12],[16],[20],[24],[28],[32],[36],[40],[0],[48]]];
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

  onClickNext() {
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

    // Passing data to Payments
    localStorage.setItem('name', this.name);
    localStorage.setItem('email', this.email);
    localStorage.setItem('telephone', this.telephone);
    localStorage.setItem('nic', this.nic);
    localStorage.setItem('seats', this.seats);
    localStorage.setItem('price', this.price);
    localStorage.setItem('stime', this.stime);

    this.router.navigate(['/payment']);
  }
}
