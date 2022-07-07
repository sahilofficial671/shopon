import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
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

  errorBag:any = {
    "email" : {
      "required": "Email is required",
      "email": "Please enter a valid email address"
    },
    "password" :{
      "required": "Password is required",
      "minlength": "Password should be of minimum 4 characters"
    },
  };

  login() {
    if(this.form.valid){
      this.isSubmitted = true;
      this.form.disable();
      this.email = this.form.get('email').value;
      this.password = this.form.get('password').value;

      this.authService
      .adminLogin({email: this.email, password: this.password})
      .toPromise()
      .then((data) => {
        if(data.status == 'success' && data.message != null && data.user){
          this.authService.storeUser(data.user, "admin");
        }

        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(["/admin/dashboard"])
        this.toastr.success(data.message);
      }).catch((err) => {
        this.isSubmitted = false;
        this.form.enable();

        (err.status == 'error' && err.message != null)
        ? this.toastr.error(err.message)
        : this.toastr.error("User not found.");;
        console.log(err);
      })
    }
  }

}
