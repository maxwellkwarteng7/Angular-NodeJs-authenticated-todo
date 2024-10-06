import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginInfo } from "../models/class";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { generateToken, storeUsername } from "../models/data";
import { ApiService } from "../services/api.service";
import { userLogins } from "../models/interface";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  inputType = signal("password");
  loginErrorMessage: string = "";

  // injecting the router service to use it 
  constructor(private router : Router ,private apiCall : ApiService , private cookie : CookieService) {}

  personDetails: LoginInfo = new LoginInfo();
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  changeInputType() {
    // check input type variable and make necessary changes to th signal 
    if (this.inputType() == "password") {
      this.inputType.set("text");
    } else {
      this.inputType.set("password");
    }
  }


// a function to handle user login 
  handleLoginSubmission() {
    let loginDetails: userLogins = this.loginForm.value;
    //make an api call to the backend 
    this.apiCall.loginUser('/login', loginDetails).subscribe((res) => {
      this.cookie.set('token', res.token, { expires: 7, sameSite: 'Strict' });
      this.router.navigateByUrl('todo'); 
    }, (err) => {
      this.loginErrorMessage = err.error.msg; 
    }); 
    // reset the form
    this.loginForm.reset({
      username: loginDetails.username,
      password: "",
    });
  }

  //getting all the login form controls
  get field() {
    return this.loginForm.controls;
  }
}
