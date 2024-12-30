import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  decodeToken() : any{
    const token = localStorage.getItem('authToken')
    if(token != null){
      return jwtDecode(token)

    }else{
      return null
    }
  }

  getRole() : string | null{
    const decodedToken = this.decodeToken()
    const scope: string = decodedToken?.scope || ''
    const role = scope.split(' ').find((item) => item.startsWith('ROLE_'));
    return role || null;
  }
   getUserPermissions(): string[] {
    const decodedToken = this.decodeToken();
    const scope: string = decodedToken?.scope || '';
    const permissions = scope.split(' ').filter((item) => !item.startsWith('ROLE_'));
    return permissions;
  }
  isAdmin() : boolean{
    const userRole = this.getRole()
    return userRole === 'ROLE_Admin'
  }
}
