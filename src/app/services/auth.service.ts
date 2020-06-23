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

  logout(): Observable<any> {
    return this.http.post(`${BASE_URL}logout`, {refresh_token: localStorage.getItem("refreshToken")})
  }

  saveTokens (data) {
    console.log(data['token'].token);
    localStorage.setItem('token', data['token'].token)
    localStorage.setItem('refreshToken', data['token'].refreshToken)
  }

  isLoggedIn() { 
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeTokens() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }
}
