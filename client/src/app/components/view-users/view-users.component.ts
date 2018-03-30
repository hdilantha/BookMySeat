import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: any[];

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('user')).name);
    this.authService.getAllUsers().subscribe(users => {
      this.users = users.users;
    },
    err => {
      return false;
    });
  }

  remove(email) {
    if(confirm("Are you sure you want to delete the route " + email + "? \nThis cannot be undone!")) {
      const user = {
        email: email
      }

      this.authService.removeUser(user).subscribe(data => {
        if(data.success) {
          this.flashMessage.show('Route removed successfully', {cssClass: 'alert-success', timeout: 3000});
          window.location.href = "/viewuser";
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  }

}
