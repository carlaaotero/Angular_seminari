import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiUrl = 'http://localhost:3000/experiencias';

  constructor(private http: HttpClient) {}

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  getExperienciaById(id: string): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}/${id}`);
  }

  addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.apiUrl, experiencia);
  }

  updateExperiencia(id: string, experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiUrl}/${id}`, experiencia);
  }

  deleteExperiencia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



