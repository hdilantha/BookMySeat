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
  cities: String;
  return: Boolean;
  stime: String;
  dtime: String;
  ddate: String;
  date: String;
  price: String;
  seats: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private turnService: TurnService,
    private busService: BusService,
    private routeService: RouteService,
    private router: Router) {
    this.return = false;
  }

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

  getSeats(license) {
    this.buses.forEach(bus => {
      if(bus.license == license) {
        if(bus.type == "2_2") {
          this.seats = "0".repeat(49);
        } else {
          this.seats = "0".repeat(60);
        }
      }
    });
  }

  onAddTurnSubmit() {
    this.getCities(this.route_id);
    this.getSeats(this.license);
    const turn = {
      turn_id: this.turn_id,
      license: this.license,
      route_id: this.route_id,
      cities: this.cities,
      return: this.return,
      email: JSON.parse(localStorage.getItem('user')).email,
      stime: this.stime,
      dtime: this.dtime,
      date: this.date,
      ddate: this.ddate,
      price: this.price,
      status: "active",
      seats: this.seats
    }

    // Required Fields
    if(!this.validateService.validateTurn(turn)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Price
    if(!this.validateService.validatePrice(this.price)) {
      this.flashMessage.show('Please enter a valid price', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register Turn
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

  getCities(route_id) {
    this.routes.forEach(route => {
      if(route.route_id === route_id) {
        this.cities = route.cities;
      }
    });
  }

  len(arr: any[]) {
    return arr.length;
  }
}
