import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Concepto } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { PruebaService } from 'src/app/services/prueba.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shit',
  templateUrl: './shit.component.html',
  styleUrls: ['./shit.component.scss', '../user-profile/user-profile.component.scss']
})
export class ShitComponent implements OnInit {

  cons: Concepto[] = [];
  currentConcepto?: Concepto
  user: any;
  instr?: SafeHtml

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  descrForm = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
  });
  
  constructor(private concServ: PruebaService, private auth: AuthService, private uServ: UserService, private sanitizer: DomSanitizer) {
    this.auth.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.concServ.getAllConcepto().subscribe(r => {
      this.cons = r.filter(f => f.tipoPreguntaId != 1)
    })
  }

  onSubmit() {
    let c = new Concepto()
    c.concepto = this.form.controls.name.value

    this.concServ.InsertConcepto(c).subscribe(r => {
      window.location.reload()
    })
  }

  update() {
    let c = new Concepto()
    c.descripcion = this.descrForm.controls.descripcion.value
    c.concepto = this.currentConcepto?.concepto!
    c.tipoPreguntaId = this.currentConcepto?.tipoPreguntaId

    this.concServ.updateConcepto(c).subscribe(r => {
      window.location.reload()
    })
  }

  refill(p: Concepto) {
    this.currentConcepto = p
    this.descrForm.controls.descripcion.setValue(p.descripcion)
    this.instr = this.sanitizer.bypassSecurityTrustHtml(<string>p.descripcion)
    console.log(this.currentConcepto)
  }

  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
      ['formula']
    ]
  }
}
