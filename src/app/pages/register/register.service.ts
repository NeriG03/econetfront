import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments.dev';
import { IRegister } from '../../interfaces/register.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(register: IRegister) {
    return this.http.post(`${api_url}/auth/register`, register);
  }
}
