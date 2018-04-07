import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { RouteService } from '../../services/route.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  starting: string;
  destination: string;
  date: string;
  sources: any[];
  routes: any[];

  constructor(private shareService: ShareService,
    private routeService: RouteService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private autoComplete: Ng2AutoCompleteModule) { }

  ngOnInit() {
    this.routeService.getAllCities().subscribe(cities => {
      this.sources = cities.cities;

    });
  }

  getToday() {
    var date = (new Date()).toLocaleDateString().split('/');
    if (date[0].length == 1){
      date[0] = '0' + date[0];
    }
    if (date[1].length == 1){
      date[1] = '0' + date[1];
    }
    var temp = date[2] + '-' + date[0] + '-' + date[1];
    return temp;
  }

  onClickSearch() {
    localStorage.setItem('starting', this.starting);
    localStorage.setItem('destination', this.destination);
    localStorage.setItem('date', this.date);
    this.router.navigate(['/searchresult']);
  }
}
