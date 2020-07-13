
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  BASE_URL = 'http://192.168.0.13:3333/'

  generateCard(): Observable<any> {
    return this.http.get('http://192.168.0.13:3333/generate-card')
  }

  getRandomCard(isFirstTime: boolean): Observable<any> {
    return this.http.post(`${this.BASE_URL}get-random-number`,{ is_first_time: isFirstTime }, {
      "headers":{Authorization: "bearer " + this.authService.getToken()}
    })
  }

  sendWinnerMode (mode) : Observable<any> {
    return this.http.post(`${this.BASE_URL}get-winner`,{ winner_mode: mode }, {
      "headers":{Authorization: "bearer " + this.authService.getToken()}
    })
  }
  }
