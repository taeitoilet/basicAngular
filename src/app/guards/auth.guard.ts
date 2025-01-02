import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if(localStorage.getItem('authToken') != null){
    if(authService.isAdmin()){
      return true
    }else{
      router.navigate(['/unauthorized'])
      return false
    }
  }else{
    router.navigate(['/login'])
    return false;
  }
  
};
