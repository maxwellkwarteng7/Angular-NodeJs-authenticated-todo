import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export const authGuard: CanActivateFn = (route, state) => {
  //  checking if the person is authenticated
  let router = inject(Router);
  let cookie = inject(CookieService); 

  const token = cookie.get('token'); 
  if (token) {
    return true;
  } else {
    router.navigateByUrl("/login");
  }
  return false ; 
};
