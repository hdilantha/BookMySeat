import { Component, OnInit } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {
  buses: any[];

  constructor(private busService: BusService,
    private router: Router) { }

  ngOnInit() {
    this.busService.getAllBuses().subscribe(buses => {
      this.buses = buses.buses;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
