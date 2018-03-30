import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.css']
})
export class ViewRoutesComponent implements OnInit {
  routes: any[];

  constructor(private routeService: RouteService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.routeService.getAllRoutes().subscribe(routes => {
      this.routes = routes.routes;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  edit(route) {
    localStorage.setItem('route_id', route.route_id);
    localStorage.setItem('cities', route.cities);
    this.router.navigate(['/editroute'])
  }

  remove(route_id) {
    if(confirm("Are you sure you want to delete the route " + route_id + "? \nThis cannot be undone!")) {
      const route = {
        route_id: route_id
      }

      this.routeService.removeRoute(route).subscribe(data => {
        if(data.success) {
          this.flashMessage.show('Route removed successfully', {cssClass: 'alert-success', timeout: 3000});
          window.location.href = "/viewroute";
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }

}
