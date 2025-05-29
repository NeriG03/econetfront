import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Cargar usuario desde localStorage al inicializar
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  public setCurrentUser(user: IUser): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  public getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  public isAdmin(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'admin';
  }

  public isUser(): boolean {
    const role = this.getCurrentUserRole();
    return role === 'user';
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  public getRedirectUrl(): string {
    const user = this.getCurrentUser();
    if (!user) {
      return '/login';
    }

    return user.role === 'admin' ? '/admin' : '/home';
  }
}
