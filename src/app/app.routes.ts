import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TodoComponent } from "./todo/todo.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "",
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "todo",
        component: TodoComponent,
      },
    ],
  },
];
