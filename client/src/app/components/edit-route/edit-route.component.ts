import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {
  route_id: String;
  cities: String;
  city: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private routeService: RouteService,
    private router: Router) { }

  ngOnInit() {
    this.route_id = localStorage.getItem('route_id');
    this.cities = localStorage.getItem('cities');
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

  onEditSubmit() {
    const route = {
      route_id: this.route_id,
      cities: this.cities
    }

    // Required Fields
    if(!this.validateService.validateRoute(route)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Edit Bus
    this.routeService.editRoute(route).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Route edited successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/viewroute']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/editroute']);
      }
    });
  }

}
