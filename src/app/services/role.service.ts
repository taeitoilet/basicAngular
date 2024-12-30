import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseServiceService } from './httpBaseService/http-base-service.service';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpBaseServiceService {

  getAllRole(): Observable<APIResponse>{
    return this.get<APIResponse>(environment.API_URL + "role")
  }

  
}
