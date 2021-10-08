import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPreg, User } from 'src/app/models/models';
import { Router } from "@angular/router"
import { BancoPregService } from 'src/app/services/banco-preg.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  bps?: BancoPreg[]
  user?: User;
  constructor(private router: Router, private auth: AuthService, private bpServ: BancoPregService) {
    this.auth.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.bpServ.get().subscribe(bp => {
      this.bps = bp.filter(bp => bp.publicado == true)
      console.log(this.user);
      
    })
  }

  redirectToExperiment() {
    this.router.navigate(['/home'])
  }
}
