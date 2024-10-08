import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal, Signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { Router } from "@angular/router";

import { NotificationService } from "../services/notification.service";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from "../services/api.service";
import { userTodo } from "../models/interface";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {

  constructor(
    private router: Router,
    private notify: NotificationService,
    private cookie: CookieService, 
    private apiCall : ApiService ,
  ) { }



  // userTodos = signal<userTodo[] | null[]>([]);
  data: userTodo[] = []; 

  ngOnInit(): void {
    this.getAllUserTodos(); 
  }

  // get the todos 
  getAllUserTodos() {
    this.apiCall.getUserTodos('/dashboard').subscribe((res) => {
      console.log(res); 
      this.data = res;
    }, (error) => {
      console.log(error); 
    })
  }


  clicked: boolean = false;

  todoForm: FormGroup = new FormGroup({
    todo: new FormControl("", [Validators.required]),
  });

  completed(val: number) {
    this.clicked = !this.clicked;
  }

  get f() {
    return this.todoForm.controls;
  }

  //reset the form
  resetForm() {
    this.todoForm.reset();
  }

  handleTodoSubmission() {
    console.log('Hello you got it '); 
  }

   handleLogout() {
    this.notify.showConfirmation("Proceed to Logout ?", "").then((res) => {
      if (res.isConfirmed) {
        // we will ask if the wants to really logout
        // let's remove the token
        this.cookie.delete('token');
        console.log("user logged out and token deleted"); 
        this.router.navigateByUrl("/login");
      }
    });
  }

  // handle todo delete
 
}
