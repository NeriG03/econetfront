import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments.dev';
import { HttpClient } from '@angular/common/http';
import { Manual } from '../../interfaces/manual.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ManualsService {
  constructor(private http: HttpClient) {}

  getManuals() {
    return this.http.get<Manual[]>(`${api_url}/manuals`);
  }

  getManual(id: string) {
    return this.http.get<Manual>(`${api_url}/manuals/${id}`);
  }
}
