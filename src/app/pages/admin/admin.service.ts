import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { environment } from '../../../enviroments/enviroments.dev';
import { Notice } from '../../interfaces/notice.interface';
import { Activity } from '../../interfaces/activity.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //MANUALES
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

  //NOTICIAS
  getNoticias() {
    return this.http.get<Notice[]>(`${api_url}/notices`);
  }

  createNotice(notice: Notice) {
    return this.http.post<Notice>(`${api_url}/notices`, notice);
  }

  updateNotice(notice: Notice) {
    // Crear una copia sin el ID para el body
    const { id, ...bodyData } = notice;
    return this.http.patch<Notice>(`${api_url}/notices/${id}`, bodyData);
  }

  deleteNotice(id: number) {
    return this.http.delete<Notice>(`${api_url}/notices/${id}`);
  }

  //ACTIVIDADES
  getActivities() {
    return this.http.get<Activity[]>(`${api_url}/activities`);
  }

  createActivity(activity: Activity) {
    console.log('Service - creating activity:', activity);
    return this.http.post<Activity>(
      `${api_url}/activities`,
      activity,
      this.httpOptions
    );
  }

  updateActivity(activity: Activity) {
    // Crear una copia sin el ID para el body
    const { id, ...bodyData } = activity;
    console.log('Service - updating activity:', bodyData);
    return this.http.patch<Activity>(
      `${api_url}/activities/${id}`,
      bodyData,
      this.httpOptions
    );
  }

  deleteActivity(id: number) {
    return this.http.delete<Activity>(`${api_url}/activities/${id}`);
  }
}
