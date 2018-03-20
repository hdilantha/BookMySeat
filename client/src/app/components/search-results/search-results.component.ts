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
    this.loadTurns(() => {
      this.loadResults();
    });
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

  checkTurn() {
    return this.results.length;
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
    this.turnService.getTurn(turn_id).subscribe(turn => {
      localStorage.setItem('turn_id', turn_id);
      localStorage.setItem('seats', turn.seats);
      this.router.navigate(['/bookdetail']);
    });
  }
}
