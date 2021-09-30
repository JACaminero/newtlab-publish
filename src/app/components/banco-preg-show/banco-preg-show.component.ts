import { Component, OnInit } from '@angular/core';
import { BancoPreg } from 'src/app/models/models';
import { BancoPregService } from 'src/app/services/banco-preg.service';
@Component({
  selector: 'app-banco-preg-show',
  templateUrl: './banco-preg-show.component.html',
  styleUrls: ['../users/users.component.scss', './banco-preg-show.component.scss']
})
export class BancoPregShowComponent implements OnInit {

  constructor(private bpServ: BancoPregService) { }

  bps?: BancoPreg[] = []

  ngOnInit(): void {  
    this.bpServ.get().subscribe(us => {
      this.bps = us;
      console.log(this.bps);
    }); 
  }

}
