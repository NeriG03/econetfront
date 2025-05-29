import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments.dev';
import {
  UserActivity,
  UserStats,
  ActivityParticipation,
} from '../interfaces/user-activity.interface';
import { Activity } from '../interfaces/activity.interface';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserActivitiesService {
  constructor(private http: HttpClient) {}

  // Obtener todas las actividades disponibles
  getAvailableActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${api_url}/activities`);
  }

  // Obtener actividades del usuario
  getUserActivities(userId: number): Observable<UserActivity[]> {
    return this.http.get<UserActivity[]>(
      `${api_url}/user-activities/user/${userId}`
    );
  }

  // Obtener estadísticas de gamificación del usuario
  getUserStats(userId: number): Observable<UserStats> {
    return this.http.get<UserStats>(`${api_url}/gamification/user/${userId}`);
  }

  // Participar en una actividad
  joinActivity(userId: number, activityId: number): Observable<UserActivity> {
    return this.http.post<UserActivity>(`${api_url}/user-activities`, {
      userId: userId,
      activityId: activityId,
    });
  }

  // Completar una actividad
  completeActivity(
    userActivityId: number,
    evidence?: string
  ): Observable<UserActivity> {
    return this.http.patch<UserActivity>(
      `${api_url}/user-activities/${userActivityId}`,
      {
        completed: true,
        evidence: evidence,
      }
    );
  }

  // Verificar si el usuario ya está participando en una actividad
 /*  isUserParticipating(userId: number, activityId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${api_url}/user-activities/check/${userId}/${activityId}`
    );
  } */
}
