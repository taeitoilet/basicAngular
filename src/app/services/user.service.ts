import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';
import { user, userCreateRequest, userUpdateRequest } from '../model/class/user';
import { HttpBaseServiceService } from './httpBaseService/http-base-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpBaseServiceService {

  getAllUser(page: number, size: number): Observable<APIResponse> {
    return this.get<APIResponse>(`${environment.API_URL}user?page=${page}&size=${size}`);

  }
  createUser(obj: userCreateRequest ): Observable<APIResponse> {
    return this.post<APIResponse>(environment.API_URL + "user/create", obj)
  }
  updateUser(obj: userUpdateRequest, id: number): Observable<APIResponse> {
    return this.put<APIResponse>(environment.API_URL + "user/update/" + id, obj)
  }
  deleteUser(id: number): Observable<APIResponse> {
    return this.put1<APIResponse>(environment.API_URL + "user/delete/" + id)
  }
  findUser(username : string): Observable<APIResponse> {
    return this.get<APIResponse>(environment.API_URL + "user/find?username=" + username)
  }
  activeUser(id: number): Observable<APIResponse> {
    return this.put1<APIResponse>(environment.API_URL + "user/active/" + id)
  }
  unactiveUser(id: number): Observable<APIResponse> {
    return this.put1<APIResponse>(environment.API_URL + "user/unactive/" + id)
  }
}
