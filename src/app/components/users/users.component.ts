import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private uServ: UserService, public dialog: MatDialog, private route: ActivatedRoute, private auth: AuthService) {
    uServ.getById(<number>auth.userValue.id).subscribe(u => this.user = u)

  }

  users: User[] = [];
  ngOnInit(): void {
    this.uServ.getAll().subscribe(us => {
      this.users = us.filter(filt => this.user?.role == 'Admin' ? true : filt.role == 'Estudiante')
      for (let i = 0; i < this.users.length; i++) {
        this.users[i].cedula = 
        `${this.users[i].cedula?.substring(0, 3)}-${this.users[i].cedula?.substring(4, 10)}-${this.users[i].cedula?.charAt(10)}`
      }
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
