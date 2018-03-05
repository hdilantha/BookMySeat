import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  name: String;
  type: String;
  telephone: String;
  email: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.queryParams['name'];
    this.telephone = this.route.snapshot.queryParams['telephone'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  onEditSubmit() {
    const user = {
      name: this.name,
      telephone: this.telephone,
      email: this.email
    }

    // Required Fields
    if(!this.validateService.validateEdit(user)) {
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Telephone
    if(!this.validateService.validateTelephone(user.telephone)) {
      this.flashMessage.show('Please enter valid telephone number', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Edit User
    this.authService.editUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('User edited successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/profile']);
      }
    });
  }
}
