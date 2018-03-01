import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.css']
})
export class ViewRoutesComponent implements OnInit {
  routes: any[];

  constructor(private routeService: RouteService,
    private router: Router) { }

  ngOnInit() {
    this.routeService.getAllRoutes().subscribe(routes => {
      this.routes = routes.routes;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
