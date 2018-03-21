import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { TurnService } from '../../services/turn.service';
import { ShareService } from '../../services/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  turns: any[];
  results: any[];

  constructor(private routeService: RouteService,
    private turnService: TurnService,
    private shareService: ShareService,
    private router: Router) {
    this.results = [];
  }

  ngOnInit() {
    if (localStorage.getItem('starting') === null) {
      this.router.navigate(['/']);
    }
    this.loadTurns(() => {
      this.loadResults();
    });
  }

  len(arr: any[]) {
    return arr.length - 1;
  }

  loadTurns(callback: () => void) {
    this.turnService.getSearchResults(localStorage.getItem('starting'), localStorage.getItem('destination'), localStorage.getItem('date')).subscribe(turns => {
      this.turns = turns.turns;
      callback();
    });
  }

  loadResults() {
    this.turns.forEach((item) => {
      if(this.checkCities(item.cities, localStorage.getItem('starting'), localStorage.getItem('destination'))) {
        this.results = this.results.concat(item);
      }
    });
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
  
  checkTurn() {
    return this.results.length;
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

  checkCities(cities, city1, city2){
    var flag = false;
    var res = false;
    cities.forEach((item) => {
      if(item == city1) {
        flag = true;
      }
      if(flag && item == city2) {
        res = true;
      }
    });
    return res;
  }

  result(turn_id) {
    localStorage.setItem('turn_id', turn_id);
    this.router.navigate(['/bookdetail']);
  }
}
