import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TurnService } from '../../services/turn.service';
import { BusService } from '../../services/bus.service';
import { RouteService } from '../../services/route.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

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

  ac_turn_ids: any[];
  inac_turn_ids: any[];

  constructor(private flashMessage: FlashMessagesService,
    private turnService: TurnService,
    private busService: BusService,
    private routeService: RouteService,
    private bookService: BookService,
    private router: Router,
    private pdfmake: PdfmakeService) {
      this.bookings = new Map();
      this.turns = new Map();
      this.turn_ids = [];
      this.user = JSON.parse(localStorage.getItem('user')).name

      this.ac_turn_ids = [];
      this.inac_turn_ids = [];
    }


  ngOnInit() {
    this.flag = 0;
    this.turnService.getAllTurns().subscribe(turns => {
      turns.turns.forEach((turn) => {
        this.turn_ids.push(turn.turn_id);

        if (turn.status == 'active') {
          this.ac_turn_ids.push(turn.turn_id);
        } else {
          this.inac_turn_ids.push(turn.turn_id);
        }
        
        this.bookService.getBookings(turn.turn_id).subscribe(resp => {
          var booking = resp.bookings;
          this.bookings.set(turn.turn_id, booking);
          this.flag = this.flag + 1;
        });
        this.turns.set(turn.turn_id, turn);
      });
    });
  }

  checkStatus(status) {
    return status === 'active';
  }

  ready() {
    return this.turns.size == this.flag;
  }

  getTurn(turn_id) {
    return this.turns.get(turn_id);
  }

  AcTurn(turn_id) {
    if (this.turns.get(turn_id).status == 'active') {
      return true;
    }
  }

  InacTurn(turn_id) {
    if (this.turns.get(turn_id).status == 'inactive') {
      return true;
    }
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

  addBooking(turn_id) {
    localStorage.setItem('turn_id', turn_id);
    localStorage.setItem('starting', this.turns.get(turn_id).cities[0]);
    localStorage.setItem('destination', this.turns.get(turn_id).cities[this.len(this.turns.get(turn_id).cities) - 1]);
    localStorage.setItem('date', this.turns.get(turn_id).date);
    this.router.navigate(['/bookdetail']);
  }

  print(turn_id) {
    var bookings = [];
    var res = this.turns.get(turn_id);
    console.log(res.license);
    this.bookService.getBookings(turn_id).subscribe(resp => {
      bookings = resp.bookings;
      this.pdfmake.configureStyles({ header: { fontSize: 12, bold: true },  header2: { fontSize: 10, bold: true }, normal: { fontSize: 10 } });

      this.pdfmake.addText("Turn ID: " + turn_id.toString(), 'header');
      this.pdfmake.addText(" ");
      this.pdfmake.addText("Bus: " + res.license + "      Route: " + res.cities[0] + " to " +  res.cities[this.len(res.cities)], 'normal');
      this.pdfmake.addText("Date: " + res.date, 'normal');
      this.pdfmake.addText(" ");

      const header1 = new Cell('NIC');
      const header2 = new Cell('Name');
      const header3 = new Cell('Seats');
      const header4 = new Cell('Telephone');

      const headerRows = new Row([header1, header2, header3, header4]);
      const widths = [100, 200, 100, 100];
      var rows = [];

      bookings.forEach(booking => {
        var row = new Row([new Cell(booking.nic.toString()), new Cell(booking.name.toString()), new Cell(booking.seats.toString()), new Cell(booking.telephone.toString())]);
        rows.push(row);
      });

      const table = new Table(headerRows, rows, widths);
      this.pdfmake.addTable(table);
      this.pdfmake.download();
      this.pdfmake.docDefinition.content.length = 0;
    });
  }
}
