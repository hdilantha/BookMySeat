import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email: String;
  password: String;
  npassword: String;
  cpassword: String;
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {
    this.email = JSON.parse(localStorage.getItem('user')).email;}

  ngOnInit() {
  }

  onClickSave() {
    const user = {
      email: this.email,
      password: this.password,
      npassword: this.npassword
    }

    // Required Fields
    if(this.validateService.validateChange(user)) {
      this.flashMessage.show('Please fill all the fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Match Passwords
    if(this.npassword != this.cpassword) {
      this.flashMessage.show('Passwords does not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Change Password
    this.authService.authenticateChange(user).subscribe(data => {
      if(data.success) {
        this.authService.changePassword(user).subscribe(data => {
          if(data.success) {
            this.flashMessage.show('Password changed successfully', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/profile']);
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/profile']);
          }
        });
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }
}
