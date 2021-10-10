import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BancoPreg, User } from 'src/app/models/models';
import { Router } from "@angular/router"
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  bps?: BancoPreg[]
  user?: User;
  constructor(private router: Router, private auth: AuthService, private uServ: UserService, private bpServ: BancoPregService) {
    this.auth.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
    this.bpServ.get().subscribe(bp => {
      bp.forEach(element => {
      this.uServ.getById(element.userId).subscribe(uu => {
        element.username = `${uu.name} ${uu.lastName1}`
        this.bps = bp;
        this.bps = bp.filter(bp => bp.publicado == true)
      })
    })})
  }

}
