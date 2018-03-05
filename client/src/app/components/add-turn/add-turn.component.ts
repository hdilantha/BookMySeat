import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { TurnService } from '../../services/turn.service';
import { BusService } from '../../services/bus.service';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-turn',
  templateUrl: './add-turn.component.html',
  styleUrls: ['./add-turn.component.css']
})
export class AddTurnComponent implements OnInit {
  buses: any;
  routes: any;
  turn_id: String;
  email: String;
  license: String;
  route_id: String;
  time: String;
  date: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private turnService: TurnService,
    private busService: BusService,
    private routeService: RouteService,
    private router: Router) { }

  ngOnInit() {
    this.busService.getAllBuses().subscribe(buses => {
      this.buses = buses.buses;
    },
    err => {
      console.log(err);
      return false;
    });

    this.routeService.getAllRoutes().subscribe(routes => {
      this.routes = routes.routes;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onAddTurnSubmit() {
    const turn = {
      turn_id: this.turn_id,
      license: this.license,
      route_id: this.route_id,
      email: JSON.parse(localStorage.getItem('user')).email,
      time: this.time,
      date: this.date,
      status: "active",
      seats: "0".repeat(50)
    }

    // Required Fields
    if(!this.validateService.validateTurn(turn)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.turnService.registerTurn(turn).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Turn added successfully', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/addturn']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/addturn']);
      }
    });
  }
}
