import { Component, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

@Component({
  selector: 'app-view-turns',
  templateUrl: './view-turns.component.html',
  styleUrls: ['./view-turns.component.css']
})
export class ViewTurnsComponent implements OnInit {
  turns: any[];
  bookings: any[];
  res: any;

  constructor(private flashMessage: FlashMessagesService,
    private turnService: TurnService,
    private bookService: BookService,
    private router: Router,
    private pdfmake: PdfmakeService) { }

  ngOnInit() {
    this.turnService.getAllTurns().subscribe(turns => {
      this.turns = turns.turns;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  seatsLeft(seats) {
    var count = 0
    for (var seat of seats) {
      if (seat == "0") {
        count = count + 1;
      }
    }
    return count;
  }

  len(arr) {
    return arr.length - 1;
  }

  getDate(date) {
    return date.split("T")[0];
  }

  isValid(status) {
    if (status == 'inactive') {
      return true;
    } else {
      return false;
    }
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

  remove(turn_id) {
    if(confirm("Are you sure you want to delete the turn " + turn_id + "? \nThis cannot be undone!")) {
      const turn = {
        turn_id: turn_id
      }
      this.turnService.removeTurn(turn).subscribe(data => {
        if(data.success) {
          const booking = {
            turn_id: turn_id
          }
          this.bookService.removeBookings(booking).subscribe(data => {
            if(data.success) {
              this.flashMessage.show('Turn removed successfully', {cssClass: 'alert-success', timeout: 3000});
              window.location.href = "/viewturn";
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
            }
          });
          // Refund getBookings
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }
}
