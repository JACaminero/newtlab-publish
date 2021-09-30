import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BancoPregService } from 'src/app/services/banco-preg.service';
import { ActivatedRoute } from '@angular/router';
import { BancoPreg } from 'src/app/models/models';

@Component({
  selector: 'app-banco-preg',
  templateUrl: './banco-preg.component.html',
  styleUrls: ['./banco-preg.component.scss']
})
export class BancoPregComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bpService: BancoPregService) { }
  selected = '1'
  selectedBP = 'bp 1'
  questionForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    answer1: new FormControl('', [Validators.required]),
    answer2: new FormControl('', [Validators.required]),
    answer3: new FormControl('', [Validators.required]),
    answer4: new FormControl('', [Validators.required]),
    selectedType: new FormControl(''),
  });

  bp: BancoPreg = new BancoPreg()
  ngOnInit(): void {
    let id: unknown = this.route.snapshot.paramMap.get('id');
    this.bpService.getById(<number>id).subscribe(u => {
      this.bp = u
    });


  }

}
