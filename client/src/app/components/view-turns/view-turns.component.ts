import { Component, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
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

  constructor(private turnService: TurnService,
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

  print(turn_id) {
    this.bookings = [];
    this.turns.forEach((turn) => {
      if(turn.turn_id === turn_id) {
        this.res = turn;
      }
    });
    this.bookService.getBookings(turn_id).subscribe(resp => {
      this.bookings = resp.bookings;
      this.pdfmake.configureStyles({ header: { fontSize: 12, bold: true },  header2: { fontSize: 10, bold: true }, normal: { fontSize: 10 } });

      this.pdfmake.addText("Turn ID: " + turn_id.toString(), 'header');
      this.pdfmake.addText(" ");
      this.pdfmake.addText("Bus: " + this.res.license.toString() + "      Route: " + this.res.cities[0].toString() + " to " +  this.res.cities[this.len(this.res.cities)].toString(), 'normal');
      this.pdfmake.addText("Date: " + this.res.date.toString(), 'normal');
      this.pdfmake.addText(" ");

      const header1 = new Cell('NIC');
      const header2 = new Cell('Name');
      const header3 = new Cell('Seats');
      const header4 = new Cell('Telephone');

      const headerRows = new Row([header1, header2, header3, header4]);
      const widths = [100, 200, 100, 100];
      var rows = [];

      this.bookings.forEach(booking => {
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
