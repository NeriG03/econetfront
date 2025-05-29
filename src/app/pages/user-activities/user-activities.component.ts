import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivitiesService } from '../../services/user-activities.service';
import {
  UserActivity,
  UserStats,
} from '../../interfaces/user-activity.interface';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'app-user-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-activities.component.html',
  styleUrl: './user-activities.component.css',
})
export class UserActivitiesComponent implements OnInit {
  userStats: UserStats | null = null;
  availableActivities: Activity[] = [];
  userActivities: UserActivity[] = [];
  isLoading = false;

  // Mock user ID - en producción vendría del auth service
  private currentUserId = 1;

  constructor(private userActivitiesService: UserActivitiesService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;

    // Cargar estadísticas del usuario
    this.userActivitiesService.getUserStats(this.currentUserId).subscribe({
      next: (stats) => {
        this.userStats = stats;
      },
      error: (error) => {
        console.error('Error loading user stats:', error);
      },
    });

    // Cargar actividades disponibles
    this.userActivitiesService.getAvailableActivities().subscribe({
      next: (activities) => {
        this.availableActivities = activities.filter(
          (activity) => activity.activo
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.isLoading = false;
      },
    });

    // Cargar actividades del usuario
    this.userActivitiesService.getUserActivities(this.currentUserId).subscribe({
      next: (userActivities) => {
        this.userActivities = userActivities;
      },
      error: (error) => {
        console.error('Error loading user activities:', error);
      },
    });
  }

  joinActivity(activityId: number): void {
    this.userActivitiesService
      .joinActivity(this.currentUserId, activityId)
      .subscribe({
        next: (userActivity) => {
          this.userActivities.push(userActivity);
          console.log('Successfully joined activity:', userActivity);
        },
        error: (error) => {
          console.error('Error joining activity:', error);
        },
      });
  }

  completeActivity(userActivity: UserActivity): void {
    if (userActivity.id) {
      this.userActivitiesService
        .completeActivity(userActivity.id, 'Auto-reporte de completado')
        .subscribe({
          next: (updatedActivity) => {
            console.log('Activity completed:', updatedActivity);
            this.loadUserData(); // Recargar datos para actualizar puntos
          },
          error: (error) => {
            console.error('Error completing activity:', error);
          },
        });
    }
  }

  isActivityJoined(activityId: number): boolean {
    return this.userActivities.some((ua) => ua.activity.id === activityId);
  }

  getActivityStatus(activity: Activity): string {
    const now = new Date();
    const startDate = new Date(activity.startDate);
    const endDate = new Date(activity.endDate);

    if (now < startDate) return 'Próximamente';
    if (now >= startDate && now <= endDate) return 'En curso';
    return 'Finalizada';
  }

  getStatusClass(activity: Activity): string {
    const status = this.getActivityStatus(activity);
    switch (status) {
      case 'Próximamente':
        return 'bg-blue-500';
      case 'En curso':
        return 'bg-green-500';
      case 'Finalizada':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getLevelProgress(): number {
    if (!this.userStats) return 0;
    const currentLevelPoints = (this.userStats.level - 1) * 100;
    const progressInLevel = this.userStats.points - currentLevelPoints;
    return (progressInLevel / 100) * 100;
  }
}
