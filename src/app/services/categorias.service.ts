import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  add(nome: string): Observable<any> {
    return this.http.post(this.apiUrl, { nome });
  }

  update(id: string, nome: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { nome });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
