import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseServiceService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  private createHeaders(customHeaders?: {[key: string]: string}): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    if (customHeaders) {
      for (const key in customHeaders) {
        if (customHeaders.hasOwnProperty(key)) {
          headers = headers.set(key, customHeaders[key]);
        }
      }
    }
    return headers;
  }
  private createParams(params?: {[key: string]: string}): HttpParams{
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !='') {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }

    return httpParams;
  }

  constructor(private http: HttpClient) { }
  get<T>(url: string, params?: {[key: string]: string}, customHeaders?: {[key: string]: string}): Observable<T> { 
      const options ={
        headers: this.createHeaders(customHeaders),
        params: this.createParams(params)
      };
      return this.http.get<T>(url, options);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.headers });
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.headers });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.headers });
  }
  put1<T>(url: string): Observable<T> {
    return this.http.put<T>(url, { headers: this.headers });
  }
}
