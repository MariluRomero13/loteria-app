import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  BASE_URL = 'http://192.168.0.13:3333/'

  login(data): Observable<any> {
    return this.http.post("http://192.168.0.13:3333/login", data)
  }

  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}logout`, {refresh_token: localStorage.getItem("refreshToken")})
  }

  saveTokens (data) {
    console.log(data['token'].token);
    localStorage.setItem('token', data['token'].token)
    localStorage.setItem('refreshToken', data['token'].refreshToken)
  }

  isLoggedIn() { 
    return !!localStorage.getItem('token')
  }

  getDataUser() {
    return localStorage.getItem('data')
  }

  removeDataUser() {
    return localStorage.removeItem('data')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeTokens() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }
}
