import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const redirectGuardGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService); 
  const router = inject(Router);
  const token = cookie.get('token'); 
  if (token) {
    return router.navigateByUrl('todo'); 
  }
  return true; 
};
