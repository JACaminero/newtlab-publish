import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BancoPregService } from 'src/app/services/banco-preg.service';

@Component({
  selector: 'app-banco-preg-insert',
  templateUrl: './banco-preg-insert.component.html',
  styleUrls: ['./banco-preg-insert.component.scss']
})
export class BancoPregInsertComponent implements OnInit {

  constructor(private bpServ: BancoPregService) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.email])
  });
  
  ngOnInit(): void {
  }

  onSubmit() {
    this.bpServ.insert(this.form.controls.name.value)
      .subscribe()
  }
}
