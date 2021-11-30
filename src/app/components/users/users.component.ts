import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user?: User
  users: User[] = [];
  usersOrig: User[] = [];

  form = new FormGroup({
    rol: new FormControl('Estudiante'),
    ident: new FormControl(''),
  });

  constructor(private uServ: UserService, public dialog: MatDialog, private route: ActivatedRoute, private auth: AuthService) {
    uServ.getById(<number>auth.userValue.id).subscribe(u => this.user = u)
  }

  ngOnInit(): void {

    this.uServ.getAll().subscribe(us => {
      this.users = us.filter(filt => this.user?.role != 'Profesor' ? true : filt.role == 'Estudiante')
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].cedula =
          `${this.users[i].cedula?.substring(0, 3)}-${this.users[i].cedula?.substring(4, 10)}-${this.users[i].cedula?.charAt(10)}`
      }
      this.usersOrig = this.users
    });
  }

  openDeleteDialog(id: number): void {

    if (this.user?.userId == id) {
      alert('No puede deshabilitar su propia cuenta.')
      return;
    }

    this.dialog.open(DeletePopup, {
      width: '250px', data: { id: id }
    });
  }

  enable(id: number) {
    this.uServ.enable(id).subscribe(() => window.location.reload());
  }
  
  filtraRol(rol: string) {
    this.users = this.usersOrig.filter(r => rol == r.role)
  }
  
  filtra(ident: string) {
    console.log(ident.toUpperCase());
    
    this.users = this.usersOrig.filter(r => r.cedula?.includes(ident) || r.matricula?.includes(ident.toUpperCase()!))
  }
}

@Component({
  selector: 'delete-popup',
  templateUrl: 'delete-popup.html',
})
export class DeletePopup {

  constructor(private uServ: UserService, public dialogRef: MatDialogRef<DeletePopup>
    , @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onAccept() {

    this.uServ.delete(this.data.id).subscribe(() => window.location.reload());
  }

  onNo(): void {
    this.dialogRef.close();
  }
}
