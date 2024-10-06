import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TodoComponent } from "../todo/todo.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterOutlet, TodoComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  
}
