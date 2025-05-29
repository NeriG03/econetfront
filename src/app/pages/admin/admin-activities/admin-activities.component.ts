import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Activity } from '../../../interfaces/activity.interface';

@Component({
  selector: 'app-admin-activities',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-activities.component.html',
  styleUrl: './admin-activities.component.css',
})
export class AdminActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  selectedActivity: Activity | null = null;
  isLoading = false;
  searchTerm = '';

  // Modal states
  isModalOpen = false;
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  // Form
  activityForm: FormGroup;

  // Messages
  errorMessage = '';
  successMessage = '';

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      points: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
      activo: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;
    this.adminService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.filteredActivities = [...this.activities];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.isLoading = false;
        this.showError('Error al cargar las actividades');
      },
    });
  }

  searchActivities(): void {
    if (!this.searchTerm.trim()) {
      this.filteredActivities = [...this.activities];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredActivities = this.activities.filter((activity) => {
      const titleMatch = activity.title.toLowerCase().includes(searchTermLower);
      const descriptionMatch = activity.description
        .toLowerCase()
        .includes(searchTermLower);

      return titleMatch || descriptionMatch;
    });
  }

  // Modal management
  openCreateModal(): void {
    this.activityForm.reset();
    this.activityForm.patchValue({ activo: true });
    this.isCreateModalOpen = true;
    this.clearMessages();
  }

  openViewModal(activity: Activity): void {
    this.selectedActivity = activity;
    this.isModalOpen = true;
  }

  openEditModal(activity: Activity): void {
    this.selectedActivity = activity;
    this.activityForm.patchValue({
      title: activity.title,
      description: activity.description,
      startDate: this.formatDateForInput(activity.startDate),
      endDate: this.formatDateForInput(activity.endDate),
      points: activity.points,
      activo: activity.activo,
    });
    this.isEditModalOpen = true;
    this.clearMessages();
  }

  openDeleteModal(activity: Activity): void {
    this.selectedActivity = activity;
    this.isDeleteModalOpen = true;
  }

  closeAllModals(): void {
    this.isModalOpen = false;
    this.isCreateModalOpen = false;
    this.isEditModalOpen = false;
    this.isDeleteModalOpen = false;
    this.selectedActivity = null;
    this.activityForm.reset();
    this.clearMessages();
  }

  // CRUD operations
  createActivity(): void {
    if (this.activityForm.valid) {
      this.isLoading = true;
      const formData = this.activityForm.value;

      // Convert dates to ISO format for backend
      const activityData = {
        ...formData,
        startDate: this.formatDateForBackend(formData.startDate),
        endDate: this.formatDateForBackend(formData.endDate),
      };

      console.log('Form data:', formData);
      console.log('Activity data to send:', activityData);

      this.adminService.createActivity(activityData).subscribe({
        next: (response) => {
          this.showSuccess('Actividad creada exitosamente');
          this.loadActivities();
          setTimeout(() => this.closeAllModals(), 1500);
        },
        error: (error) => {
          console.error('Error creating activity:', error);
          console.error('Error response:', error.error);
          this.showError('Error al crear la actividad');
          this.isLoading = false;
        },
      });
    }
  }

  updateActivity(): void {
    if (this.activityForm.valid && this.selectedActivity) {
      this.isLoading = true;
      const formData = this.activityForm.value;

      // Convert dates to ISO format for backend
      const activityData = {
        ...formData,
        id: this.selectedActivity.id,
        startDate: this.formatDateForBackend(formData.startDate),
        endDate: this.formatDateForBackend(formData.endDate),
      };

      console.log('Form data:', formData);
      console.log('Activity data to send:', activityData);

      this.adminService.updateActivity(activityData).subscribe({
        next: (response) => {
          this.showSuccess('Actividad actualizada exitosamente');
          this.loadActivities();
          setTimeout(() => this.closeAllModals(), 1500);
        },
        error: (error) => {
          console.error('Error updating activity:', error);
          console.error('Error response:', error.error);
          this.showError('Error al actualizar la actividad');
          this.isLoading = false;
        },
      });
    }
  }

  deleteActivity(): void {
    if (this.selectedActivity && this.selectedActivity.id) {
      this.isLoading = true;

      this.adminService.deleteActivity(this.selectedActivity.id).subscribe({
        next: () => {
          this.showSuccess('Actividad eliminada exitosamente');
          this.loadActivities();
          setTimeout(() => this.closeAllModals(), 1500);
        },
        error: (error) => {
          console.error('Error deleting activity:', error);
          this.showError('Error al eliminar la actividad');
          this.isLoading = false;
        },
      });
    }
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.activityForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.activityForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required'])
        return `${this.getFieldLabel(fieldName)} es requerido`;
      if (field.errors['minlength'])
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${
          field.errors['minlength'].requiredLength
        } caracteres`;
      if (field.errors['min'])
        return `Los puntos deben ser al menos ${field.errors['min'].min}`;
      if (field.errors['max'])
        return `Los puntos no pueden exceder ${field.errors['max'].max}`;
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      title: 'El título',
      description: 'La descripción',
      startDate: 'La fecha de inicio',
      endDate: 'La fecha de fin',
      points: 'Los puntos',
    };
    return labels[fieldName] || fieldName;
  }

  // Message management
  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => this.clearMessages(), 5000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => this.clearMessages(), 5000);
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Utility methods
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Format date from backend (ISO) to HTML input format (YYYY-MM-DD)
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Format date from HTML input (YYYY-MM-DD) to backend format (ISO)
  formatDateForBackend(dateString: string): string {
    if (!dateString) return '';

    try {
      // Parse the date and create ISO string
      const [year, month, day] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      // Validate the date
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return '';
      }

      return date.toISOString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
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

  getDuration(activity: Activity): number {
    const startDate = new Date(activity.startDate);
    const endDate = new Date(activity.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
