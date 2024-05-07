import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) { }

  register(registerData: { login: string, password: string, role: string }) {
    return this.http.post(this.apiUrl, registerData);
  }
}