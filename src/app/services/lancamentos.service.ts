import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Lancamento } from '../model/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  private apiUrl = 'http://localhost:8080/api/lancamentos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getLancamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  add(lancamento: Lancamento): Observable<any> {
    return this.http.post(this.apiUrl, lancamento);
  }

  update(id: string, lancamento: Lancamento) {
    return this.http.put(`${this.apiUrl}/${id}`, lancamento);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
