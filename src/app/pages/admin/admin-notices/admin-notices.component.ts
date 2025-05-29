import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../admin.service';
import { Notice } from '../../../interfaces/notice.interface';

@Component({
  selector: 'app-admin-notices',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-notices.component.html',
  styleUrl: './admin-notices.component.css',
  standalone: true,
})
export class AdminNoticesComponent implements OnInit {
  notices: Notice[] = [];
  filteredNotices: Notice[] = [];
  selectedNotice: Notice | null = null;
  isModalOpen = false;
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  isLoading = false;
  searchTerm = '';
  errorMessage = '';
  successMessage = '';

  noticeForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.noticeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      img: ['', [Validators.required]],
      activo: [true, [Validators.required]],
      user: [1],
    });
  }

  ngOnInit() {
    this.loadNotices();
  }

  loadNotices() {
    this.isLoading = true;
    console.log('Cargando noticias...');

    this.adminService.getNoticias().subscribe({
      next: (notices) => {
        console.log('Noticias recibidas:', notices);
        this.notices = notices || [];
        this.filteredNotices = this.notices;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        console.error('Detalles del error:', {
          status: error.status,
          message: error.message,
          url: error.url,
        });
        this.isLoading = false;

        // Mostrar un mensaje más específico al usuario
        if (error.status === 0) {
          alert(
            'Error de conexión: No se puede conectar al servidor. Verifica que el backend esté ejecutándose en http://localhost:3000'
          );
        } else if (error.status === 404) {
          alert(
            'Error 404: Endpoint no encontrado. Verifica la URL de la API.'
          );
        } else {
          alert(`Error ${error.status}: ${error.message}`);
        }
      },
    });
  }

  searchNotices() {
    if (!this.searchTerm.trim()) {
      this.filteredNotices = this.notices;
    } else {
      this.filteredNotices = this.notices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          notice.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openViewModal(notice: Notice) {
    this.selectedNotice = notice;
    this.isModalOpen = true;
  }

  openCreateModal() {
    this.noticeForm.reset();
    this.noticeForm.patchValue({ user: 1, activo: true });
    this.isCreateModalOpen = true;
  }

  openEditModal(notice: Notice) {
    this.selectedNotice = notice;
    // Asegurar que user sea un número y que el ID esté incluido
    const noticeData = {
      ...notice,
      id: notice.id, // Asegurar que el ID esté presente
      user:
        typeof notice.user === 'object'
          ? (notice.user as any)?.id || 1
          : Number(notice.user) || 1,
    };
    console.log('Datos de la noticia a editar:', noticeData);
    this.noticeForm.patchValue(noticeData);
    this.isEditModalOpen = true;
  }

  openDeleteModal(notice: Notice) {
    this.selectedNotice = notice;
    this.isDeleteModalOpen = true;
  }

  closeAllModals() {
    this.isModalOpen = false;
    this.isCreateModalOpen = false;
    this.isEditModalOpen = false;
    this.isDeleteModalOpen = false;
    this.selectedNotice = null;
  }

  createNotice() {
    if (this.noticeForm.valid) {
      this.isLoading = true;
      const noticeData = this.noticeForm.value;
      delete noticeData.id; // Remover id para crear

      // Asegurar que user sea un número válido
      if (noticeData.user) {
        noticeData.user = Number(noticeData.user);
      }

      console.log('Datos a enviar para crear noticia:', noticeData);

      this.adminService.createNotice(noticeData).subscribe({
        next: (newNotice) => {
          this.notices.push(newNotice);
          this.searchNotices(); // Actualizar lista filtrada
          this.closeAllModals();
          this.isLoading = false;
          alert('Noticia creada exitosamente!');
        },
        error: (error) => {
          console.error('Error al crear noticia:', error);
          this.isLoading = false;

          // Manejar diferentes tipos de errores
          if (error.status === 400) {
            const errorMessage = error.error?.message || 'Datos inválidos';
            if (Array.isArray(errorMessage)) {
              alert(`Error de validación: ${errorMessage.join(', ')}`);
            } else {
              alert(`Error de validación: ${errorMessage}`);
            }
          } else if (error.status === 409) {
            alert('Ya existe una noticia con ese título.');
          } else {
            alert('Error al crear la noticia. Intenta nuevamente.');
          }
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  updateNotice() {
    if (this.noticeForm.valid && this.selectedNotice) {
      this.isLoading = true;
      const noticeData = {
        ...this.noticeForm.value,
        id: this.selectedNotice.id, // ID para la URL
      };

      // Asegurar que user sea un número válido
      if (noticeData.user) {
        noticeData.user = Number(noticeData.user);
      }

      console.log('Datos completos para actualizar:', noticeData);
      console.log('ID será usado en URL:', this.selectedNotice.id);

      this.adminService.updateNotice(noticeData).subscribe({
        next: (updatedNotice) => {
          const index = this.notices.findIndex(
            (n) => n.id === updatedNotice.id
          );
          if (index !== -1) {
            this.notices[index] = updatedNotice;
            this.searchNotices(); // Actualizar lista filtrada
          }
          this.closeAllModals();
          this.isLoading = false;
          alert('Noticia actualizada exitosamente!');
        },
        error: (error) => {
          console.error('Error al actualizar noticia:', error);
          this.isLoading = false;

          if (error.status === 400) {
            const errorMessage = error.error?.message || 'Datos inválidos';
            alert(`Error de validación: ${errorMessage}`);
          } else if (error.status === 404) {
            alert('Noticia no encontrada.');
          } else {
            alert('Error al actualizar la noticia. Intenta nuevamente.');
          }
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  deleteNotice() {
    if (this.selectedNotice && this.selectedNotice.id) {
      this.isLoading = true;

      this.adminService.deleteNotice(this.selectedNotice.id).subscribe({
        next: () => {
          this.notices = this.notices.filter(
            (n) => n.id !== this.selectedNotice!.id
          );
          this.searchNotices(); // Actualizar lista filtrada
          this.closeAllModals();
          this.isLoading = false;
          alert('Noticia eliminada exitosamente!');
        },
        error: (error) => {
          console.error('Error al eliminar noticia:', error);
          this.isLoading = false;

          if (error.status === 404) {
            alert('Noticia no encontrada.');
          } else {
            alert('Error al eliminar la noticia. Intenta nuevamente.');
          }
        },
      });
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.noticeForm.controls).forEach((key) => {
      this.noticeForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.noticeForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.noticeForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  hideImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
  }
}
