import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signin(data): Observable<any> {
    return this.http.post('http://192.168.0.13:3333/register', data)
  }
}
