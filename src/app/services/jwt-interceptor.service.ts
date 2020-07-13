import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService {

  constructor(private authService: AuthService) { }
}
