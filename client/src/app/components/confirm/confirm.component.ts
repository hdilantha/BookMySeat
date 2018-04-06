import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  name: String;
  flag: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.flag = false;
    if (localStorage.getItem('name') === null) {
      this.router.navigate(['/']);
    } else {
      this.name = localStorage.getItem('name').split(" ")[0];
      localStorage.clear();
      this.flag = true;
    }
  }

  onClickBack() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
