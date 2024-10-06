import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { Icon } from "../models/interface";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor() {}
  //A function to show alert
  showSuccess(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: Icon.success, 
    });
  }
  // a confirmation message to ask before we proceed with the action
  showConfirmation(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      width : '360px' , 
      icon: Icon.warning,
      showCancelButton: true,
      cancelButtonText: "No",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      cancelButtonColor: 'black', 
      confirmButtonColor : "#005db4"
    });
  }
}
