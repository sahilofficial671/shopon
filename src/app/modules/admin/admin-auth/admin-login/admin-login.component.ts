import { Component, OnInit, ViewChild } from '@angular/core';
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

  isSubmitted:boolean = false;
  loading:boolean = false;
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
      // get return url from route parameters or default to '/'
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
      this.loading = true;
      this.email = this.form.get('email').value;
      this.password = this.form.get('password').value;
      console.log("Email: "+this.email+", Pass: "+this.password);

      // Async call
      new Promise((resolve, reject) => {
        this.authService
        .adminLogin({email: this.email, password: this.password})
        .subscribe(async data => {
          if(data.status == 'success' && data.message != null && data.user){
            this.authService.mapUsertoLocalStorage(data.user);
            this.toastr.success(data.message);
            resolve(data);
          }
        }, err => {
          this.loading = false;
          (err.status == 'error' && err.message != null)
          ? this.toastr.error(err.message)
          : this.toastr.error("User not found.");;
          console.log(err);
          reject(err);
        });
      }).then(()=>{
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(["/admin/dashboard"])
      })
    }
  }

}
