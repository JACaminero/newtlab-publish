import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user?: User;

  constructor(
    private auth: AuthService, public dialog: MatDialog
  ) {
    this.user = this.auth.userValue;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SendTestDialog, {
      width: '473px',
      data: { message: 'Prueba enviada exitosamente' }
    });
  }

  ngOnInit(): void {
  }
}


@Component({
  selector: 'send-test-dialog',
  templateUrl: './send-test.html',
})
export class SendTestDialog {

  constructor(
    public dialogRef: MatDialogRef<SendTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
