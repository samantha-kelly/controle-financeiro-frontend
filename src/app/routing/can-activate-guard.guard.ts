import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateGuard: CanActivateFn = (route, state) => {

  const authToken = inject(AuthService).getToken(); 

  return true;
};
