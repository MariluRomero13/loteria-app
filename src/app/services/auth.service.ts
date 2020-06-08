import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(`${BASE_URL}login`, data)
  }

  saveTokens (data) {
    localStorage.setItem('token', data['token'])
    localStorage.setItem('refreshToken', data['refreshToken'])
  }
}
