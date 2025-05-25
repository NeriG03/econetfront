import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments.dev';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../interfaces/login.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: ILogin) {
    return this.http.post(`${api_url}/auth/login`, login);
  }
}
