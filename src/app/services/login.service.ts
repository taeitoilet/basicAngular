import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';
import { loginRequest } from '../model/class/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http : HttpClient) { }
  login(obj : loginRequest) : Observable<APIResponse>{
    return this.http.post<APIResponse>(environment.API_URL + "login", obj ,{withCredentials : true
      ,headers : new HttpHeaders({
          'Content-Type': 'application/json'
    }) })
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
