import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  starting: string;
  destination: string;
  date: string;

  constructor(private shareService: ShareService,
    private router: Router) { }

  ngOnInit() {
  }

  onClickSearch() {
    localStorage.setItem('starting', this.starting);
    localStorage.setItem('destination', this.destination);
    localStorage.setItem('date', this.date);
    this.router.navigate(['/searchresult']);
  }
}
