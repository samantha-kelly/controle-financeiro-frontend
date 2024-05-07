import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private _snackBar: MatSnackBar) {
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt-token');

    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('Usuário não autenticado!');
    }

    return token;
  }

  removeToken() {
    const token = localStorage.getItem('jwt-token');

    if (token) {
      localStorage.removeItem('jwt-token');
    }
  }

  getUser() {

    let token = this.getToken();
    if (token) {

      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      let tokenData = JSON.parse(jsonPayload);

      return tokenData.sub;
    }
  }
}
