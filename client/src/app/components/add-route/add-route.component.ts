import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})

export class AddRouteComponent implements OnInit {
  route_id: String;
  cities: String;
  city: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private routeService: RouteService,
    private router: Router) { }

  ngOnInit() {
  }

  addCity(city: string) {
    if (this.cities != undefined) {
      var arr = this.cities.split(",");
      arr.push(city.trim());
      this.cities = arr.join(",");
    } else {
      this.cities = city.trim();
    }
  }

  removeCity() {
    if (this.cities != undefined) {
      var arr = this.cities.split(",");
      arr.pop();
      this.cities = arr.join(",").trim();
    } else {
      this.cities = this.cities;
    }
  }

  onRegisterSubmit() {
    const route = {
      route_id: this.route_id,
      cities: this.cities
    }

    // Required Fields
    if(!this.validateService.validateRoute(route)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register route
    this.routeService.registerRoute(route).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Route added successfully', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/addroute']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/addroute']);
      }
    });
  }
}
