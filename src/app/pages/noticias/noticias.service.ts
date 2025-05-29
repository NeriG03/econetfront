import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments.dev';
import { HttpClient } from '@angular/common/http';
import { Notice } from '../../interfaces/notice.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  constructor(private http: HttpClient) {}

  getNoticias() {
    return this.http.get<Notice[]>(`${api_url}/notices`);
  }

  getNoticia(id: string) {
    return this.http.get<Notice>(`${api_url}/notices/${id}`);
  }
}
