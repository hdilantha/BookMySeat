import { Component, OnInit } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {
  buses: any[];

  constructor(private busService: BusService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.busService.getAllBuses().subscribe(buses => {
      this.buses = buses.buses;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onClickEdit(bus) {
    console.log(bus);
    localStorage.setItem('license', bus.license);
    localStorage.setItem('owner', bus.owner);
    localStorage.setItem('type', bus.type);
    this.router.navigate(['/editbus']);
  }

  onClickRemove(license) {
    if(confirm("Are you sure you want to delete the bus " + license + "? \nThis cannot be undone!")) {
      const bus = {
        license: license
      }

      this.busService.removeBus(bus).subscribe(data => {
        if(data.success) {
          this.flashMessage.show('Bus removed successfully', {cssClass: 'alert-success', timeout: 3000});
          window.location.href = "/viewbus";
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }
}
