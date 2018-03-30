import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../../services/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})

export class AddBusComponent implements OnInit {
  user: any;
  license: String;
  owner: String;
  type: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private busService: BusService,
    private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  onAddBusSubmit() {
    const bus = {
      license: this.license,
      email: JSON.parse(this.user).email,
      type: this.type,
      owner: this.owner,
      status: 'active'
    }

    // Required Fields
    if(!this.validateService.validateBus(bus)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate License
    if(!this.validateService.validateLicense(this.license)) {
      this.flashMessage.show('Please enter a valid license plate', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register Bus
    this.busService.registerBus(bus).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Bus added successfully', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/viewbus']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/addbus']);
      }
    });
  }
}
