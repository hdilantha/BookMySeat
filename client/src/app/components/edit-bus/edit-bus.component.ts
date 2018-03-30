import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BusService } from '../../services/bus.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {
  license: String;
  type: String;
  owner: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.license = localStorage.getItem('license');
    this.owner = localStorage.getItem('owner');
    this.type = localStorage.getItem('type');
  }

  onEditSubmit() {
    const bus = {
      license: this.license,
      owner: this.owner,
      type:this.type
    }

    // Required Fields
    if(!this.validateService.validateEditBus(bus)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Edit Bus
    this.busService.editBus(bus).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Bus edited successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/editbus']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/editbus']);
      }
    });
  }

}
