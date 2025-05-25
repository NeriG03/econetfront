import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { environment } from '../../../enviroments/enviroments.dev';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getManuals() {
    return this.http.get<Manual[]>(`${api_url}/manuals`);
  }

  createManual(manual: Manual) {
    return this.http.post<Manual>(`${api_url}/manuals`, manual);
  }

  updateManual(manual: Manual) {
    // Crear una copia sin el ID para el body
    const { id, ...bodyData } = manual;
    return this.http.patch<Manual>(`${api_url}/manuals/${id}`, bodyData);
  }

  deleteManual(id: number) {
    return this.http.delete<Manual>(`${api_url}/manuals/${id}`);
  }

  getManual(id: number) {
    return this.http.get<Manual>(`${api_url}/manuals/${id}`);
  }
}
