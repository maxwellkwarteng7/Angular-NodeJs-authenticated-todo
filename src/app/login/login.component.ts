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
  router = inject(Router); 

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

  // function to clear the login Error message
  clearLoginErrorMessage() {
    setTimeout(() => {
      this.loginErrorMessage = "";
    }, 10000);
  }

  handleLoginSubmission() {
  

    let loginDetails = this.loginForm.value;
    const details = localStorage.getItem(loginDetails.username);
    if (details) {
      if (details === loginDetails.password) {
        // set the global state username to the users username 
        storeUsername(loginDetails.username); 
        // generate a token of the user for authentication 
        localStorage.setItem('token', generateToken()); 
        // navigate the user to the todo page 
        this.router.navigateByUrl('/todo'); 
      } else {
        // set the error message to the loginErrorMessage variable 
        this.loginErrorMessage = "Incorrect password, please try again.";
        // clear the error message after some set time 
        this.clearLoginErrorMessage();
      }
    } else {
       // set the error message to the loginErrorMessage variable 
      this.loginErrorMessage = "We cannot find an account for this username";
       // clear the error message after some set time 
      this.clearLoginErrorMessage();
    }
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
