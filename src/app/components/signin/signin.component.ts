import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  error: any = '';
  returnUrl: string = '';
  signInForm = new FormGroup({
    username: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.maxLength(14)]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      this.error = this.signInForm.errors
      return;
    }

    let user: string = this.signInForm.get('username')?.value;
    let psw: string = this.signInForm.get('password')?.value;
    this.authService
      .login(user, psw)
      .pipe(first())
      .subscribe(
        (res) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        (error) => {
          console.log(error)
          this.error = error.error.message;
        }
      );
  }
}
