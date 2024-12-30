import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';
import { news } from '../model/class/news';
import { HttpBaseServiceService } from './httpBaseService/http-base-service.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends HttpBaseServiceService {

  getAllNews(page: number, size: number): Observable<APIResponse> {
    return this.get<APIResponse>(`${environment.API_URL}news?page=${page}&size=${size}`)
  }
  createNews(obj: news): Observable<APIResponse> {
    return this.post<APIResponse>(environment.API_URL + "news/create", obj)
  }
  updateNews(obj: news, id: number): Observable<APIResponse> {
    return this.put<APIResponse>(environment.API_URL + "news/update/" + id, obj)
  }
  deleteNews(id: number): Observable<APIResponse> {
    return this.delete<APIResponse>(environment.API_URL + "news/delete/" + id)
  }
  searchNews(title : string): Observable<APIResponse> {
    return this.get<APIResponse>(environment.API_URL + "news/findnews?title=" + title)
    
  }
  findNews(category: string, content: string, page: number, size: number): Observable<APIResponse> {
    const params: { [key: string]: string } = {
      page: page.toString(),
      size: size.toString(),
      category: category,
      content: content,
    };
    return this.get<APIResponse>(`${environment.API_URL}news/search`, params);
  }
  getCategory():Observable<APIResponse>{
    return this.get<APIResponse>(environment.API_URL + "news/category")
  }
}
