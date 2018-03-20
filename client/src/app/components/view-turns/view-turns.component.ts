import { Component, OnInit } from '@angular/core';
import { TurnService } from '../../services/turn.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-turns',
  templateUrl: './view-turns.component.html',
  styleUrls: ['./view-turns.component.css']
})
export class ViewTurnsComponent implements OnInit {
  turns: any[];

  constructor(private turnService: TurnService,
    private router: Router) { }

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
}
