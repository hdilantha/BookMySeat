import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: any[];

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users.users;
    },
    err => {
      return false;
    });
  }

}
