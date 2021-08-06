import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  error = '';
  returnUrl: string = '';
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // if (this.authService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    let user: string = this.signInForm.get('username')?.value;
    let psw: string = this.signInForm.get('password')?.value;
    this.authService
      .login(user, psw)
      .pipe(first())
      .subscribe(
        (res) => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
