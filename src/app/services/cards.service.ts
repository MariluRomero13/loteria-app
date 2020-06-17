
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  generateCard(): Observable<any> {
    return this.http.get(`${BASE_URL}generate-card`)
  }
}
