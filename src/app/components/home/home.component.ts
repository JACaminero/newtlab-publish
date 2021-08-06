import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user?: User;

  constructor(
    private auth: AuthService
  ) {
    this.user = this.auth.userValue;
  }


  ngOnInit(): void {
  }

}
