import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { Router } from "@angular/router"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user?: User;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

  redirectToExperiment() {
    this.router.navigate(['/home'])
  }
}
