import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  type: String;
  telephone: String;
  email: String;
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private emailService: EmailService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      type: this.type,
      telephone: this.telephone,
      email: this.email,
      password: "1234"
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
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

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {

        var text = "Dear " + this.name.trim().split(" ")[0] + ",<br/>Your request to join BookMySeat as a bus operator has been approved.<br/><br/>Now you can login to your user account using,<br/>Email: "
        + this.email + "<br/>Password: 1234<br/> Password given above is the default password for your account. We recommend you to change it as the first thing when you login to your account.<br/><br/>If any inconvenience occured, please contact us.<br/>Thank you.<br/><br/>Best regards.";
        const msg = {
          to: this.email,
          from: 'register@bookmyseat.com',
          subject: 'Registration request accepted',
          text: text,
          html: text,
        };
        this.emailService.sendMail(msg).subscribe(data => {
          if(data.success) {
            this.flashMessage.show('User registered successfully', {cssClass: 'alert-success', timeout: 4000});
            this.router.navigate(['/dashboard']);
          } else {
            this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          }
        });

      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
