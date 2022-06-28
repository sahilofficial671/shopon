import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-front-login',
  templateUrl: './front-login.component.html',
  styleUrls: ['./front-login.component.css']
})
export class FrontLoginComponent implements OnInit {

  passwordToggle = true;
  isSubmitted:boolean = false;
  errors:any = [];
  email:string;
  password:string;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  form:FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ], [

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  login() {
    if(this.form.valid){
      this.isSubmitted = true;
      this.form.disable();
      this.email = this.form.get('email').value;
      this.password = this.form.get('password').value;

      this.authService
      .customerLogin({email: this.email, password: this.password})
      .toPromise()
      .then((data) => {
        if(data.status == 'success' && data.user){
          this.authService.mapUsertoLocalStorage(data.user, "customer");
        }

        this.returnUrl
          ? this.router.navigate([this.returnUrl])
          : this.router.navigate(["/customer/dashboard"])

        this.toastr.success("You have been logged in.");
      }).catch((err) => {
        console.log(err);

        this.isSubmitted = false;
        this.form.enable();

        (err.status == 'error' && err.message != null)
          ? this.toastr.error(err.message)
          : this.toastr.error("User not found.");

      })

      return;
    }

    this.toastr.error("Please fill all mandatory fields!")
  }

}
