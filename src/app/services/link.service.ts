import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  BASE_URL = 'http://192.168.0.13:3333/'

  generateLink (): Observable<any> {
    return this.http.post(`${this.BASE_URL}generate-link`, {}, {
      "headers":{ Authorization: "bearer " + this.authService.getToken() }
    })
  }

  checkLink(link) : Observable<any> {
    return this.http.post(`${this.BASE_URL}verify-link`, { link }, {
      "headers":{ Authorization: "bearer " + this.authService.getToken() }
    })
  }
}
