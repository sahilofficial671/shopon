import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  isSubmitted:boolean = false;
  errors:any = [];
  email:string;
  password:string;

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
    "username" : {
      "required": "Username is required",
      "email": "Please enter a valid email address"
    },
    "password" :{
      "required": "Password is required",
      "minlength": "Password should be of minimum 4 characters"
    },
  };

  submit() {
    this.isSubmitted = true;

    if(this.form.valid){
      this.email = this.form.get('email').value;
      this.password = this.form.get('password').value;
      console.log("Email: "+this.email+", Pass: "+this.password);

      // Async call
      new Promise((resolve, reject) => {
        this.authService
        .adminLogin({email: this.email, password: this.password})
        .subscribe(async data => {
          console.log(data);
          if(data.status == 'success' && data.message != null){
            this.toastr.success(data.message)
            sessionStorage.setItem("user_session_id", data.user.id);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("roles", JSON.stringify(data.user.roles));
            resolve(data);
          }

          // this.router.navigateByUrl('/admin-dashboard');
        }, err => {
          (err.status == 'error' && err.message != null)
          ? this.toastr.error(err.message)
          : this.toastr.error("User not found.");;
          console.log(err);
          reject(err);
        });
      }).then(()=>{
        console.log(sessionStorage.getItem("user_session_id"))
        console.log(JSON.parse(sessionStorage.getItem("user")))
        console.log(JSON.parse(sessionStorage.getItem("roles")))
      })
    }
  }
}
