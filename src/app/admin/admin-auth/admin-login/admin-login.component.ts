import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  isSubmitted:boolean = false;
  errors:any = [];

  form:FormGroup = new FormGroup({
    username: new FormControl('', [
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

  usernameError:string;
  passwordError:string;
  usernameIsFocused:boolean = false;
  passwordIsFocused:boolean = false;

  // onFocus(event, element){
  //   console.log(event);
  //   this.usernameIsFocused = element == 'username';
  //   this.passwordIsFocused = element == 'password';
  // }

  submit() {
    this.isSubmitted = true;
    // if(this.form.get('username').errors){
    //   this.usernameError = this.errorBag.username[Object.keys(this.form.get('username').errors)[0]];
    // }

    // if(this.form.get('password').errors){
    //   this.passwordError = this.errorBag.password[Object.keys(this.form.get('password').errors)[0]];
    // }

    // this.emptyValidatedErrors()
  }

  emptyValidatedErrors():void{
    if(this.form.get('username').errors == null){
      this.usernameError = null;
    }

    if(this.form.get('password').errors == null){
      this.passwordError = null;
    }
  }

}
