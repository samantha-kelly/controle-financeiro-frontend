import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  login(loginData: { login: string, password: string }) {
    return this.http.post(this.apiUrl, loginData);
  }
}