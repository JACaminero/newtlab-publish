import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private uServ: UserService, public dialog: MatDialog, private route: ActivatedRoute,) { }

  users: User[] = [];
  ngOnInit(): void {
    this.uServ.getAll().subscribe(us => {
      this.users = us;
    });
  }

  openDeleteDialog(id: number): void {
    this.dialog.open(DeletePopup, {
      width: '250px', data: { id: id }
    });
  }

  enable(id: number) {
    console.log('need to implement this bro ', id);
    
  }
}

@Component({
  selector: 'delete-popup',
  templateUrl: 'delete-popup.html',
})
export class DeletePopup {

  constructor(private uServ: UserService, public dialogRef: MatDialogRef<DeletePopup>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onAccept() {
    this.uServ.delete(this.data.id).subscribe();
  }

  onNo(): void {
    this.dialogRef.close();
  }
}
