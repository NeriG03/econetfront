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
import { Manual } from '../../../interfaces/manual.interface';

@Component({
  selector: 'app-admin-manuales',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-manuales.component.html',
  standalone: true,
})
export class AdminManualesComponent implements OnInit {
  manuales: Manual[] = [];
  filteredManuales: Manual[] = [];
  selectedManual: Manual | null = null;
  isModalOpen = false;
  isCreateModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  isLoading = false;
  searchTerm = '';

  manualForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.manualForm = this.fb.group({
      planta: ['', [Validators.required, Validators.minLength(2)]],
      luz: ['', [Validators.required]],
      riego: ['', [Validators.required]],
      humedad: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      abono: ['', [Validators.required]],
      poda: ['', [Validators.required]],
      trasplante: ['', [Validators.required]],
      enfermedades: ['', [Validators.required]],
      otros: [''],
      imagen: ['', [Validators.required]],
      user: [1],
    });
  }

  ngOnInit() {
    this.loadManuales();
  }

  loadManuales() {
    this.isLoading = true;
    console.log('Cargando manuales...');

    this.adminService.getManuals().subscribe({
      next: (manuales) => {
        console.log('Manuales recibidos:', manuales);
        this.manuales = manuales || [];
        this.filteredManuales = this.manuales;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar manuales:', error);
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

  searchManuales() {
    if (!this.searchTerm.trim()) {
      this.filteredManuales = this.manuales;
    } else {
      this.filteredManuales = this.manuales.filter((manual) =>
        manual.planta.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openViewModal(manual: Manual) {
    this.selectedManual = manual;
    this.isModalOpen = true;
  }

  openCreateModal() {
    this.manualForm.reset();
    this.manualForm.patchValue({ user: 1 });
    this.isCreateModalOpen = true;
  }

  openEditModal(manual: Manual) {
    this.selectedManual = manual;
    // Asegurar que user sea un número y que el ID esté incluido
    const manualData = {
      ...manual,
      id: manual.id, // Asegurar que el ID esté presente
      user:
        typeof manual.user === 'object'
          ? (manual.user as any)?.id || 1
          : Number(manual.user) || 1,
    };
    console.log('Datos del manual a editar:', manualData);
    this.manualForm.patchValue(manualData);
    this.isEditModalOpen = true;
  }

  openDeleteModal(manual: Manual) {
    this.selectedManual = manual;
    this.isDeleteModalOpen = true;
  }

  closeAllModals() {
    this.isModalOpen = false;
    this.isCreateModalOpen = false;
    this.isEditModalOpen = false;
    this.isDeleteModalOpen = false;
    this.selectedManual = null;
  }

  createManual() {
    if (this.manualForm.valid) {
      this.isLoading = true;
      const manualData = this.manualForm.value;
      delete manualData.id; // Remover id para crear

      // Asegurar que user sea un número válido
      if (manualData.user) {
        manualData.user = Number(manualData.user);
      }

      console.log('Datos a enviar para crear manual:', manualData);

      this.adminService.createManual(manualData).subscribe({
        next: (newManual) => {
          this.manuales.push(newManual);
          this.searchManuales(); // Actualizar lista filtrada
          this.closeAllModals();
          this.isLoading = false;
          alert('Manual creado exitosamente!');
        },
        error: (error) => {
          console.error('Error al crear manual:', error);
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
            alert('Ya existe un manual con ese nombre de planta.');
          } else {
            alert('Error al crear el manual. Intenta nuevamente.');
          }
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  updateManual() {
    if (this.manualForm.valid && this.selectedManual) {
      this.isLoading = true;
      const manualData = {
        ...this.manualForm.value,
        id: this.selectedManual.id, // ID para la URL (el servicio lo separará automáticamente)
      };

      // Asegurar que user sea un número válido
      if (manualData.user) {
        manualData.user = Number(manualData.user);
      }

      console.log('Datos completos para actualizar:', manualData);
      console.log('ID será usado en URL:', this.selectedManual.id);

      this.adminService.updateManual(manualData).subscribe({
        next: (updatedManual) => {
          const index = this.manuales.findIndex(
            (m) => m.id === updatedManual.id
          );
          if (index !== -1) {
            this.manuales[index] = updatedManual;
            this.searchManuales(); // Actualizar lista filtrada
          }
          this.closeAllModals();
          this.isLoading = false;
          alert('Manual actualizado exitosamente!');
        },
        error: (error) => {
          console.error('Error al actualizar manual:', error);
          this.isLoading = false;

          // Manejar diferentes tipos de errores
          if (error.status === 400) {
            const errorMessage = error.error?.message || 'Datos inválidos';
            if (Array.isArray(errorMessage)) {
              alert(`Error de validación: ${errorMessage.join(', ')}`);
            } else {
              alert(`Error de validación: ${errorMessage}`);
            }
          } else if (error.status === 404) {
            alert('Manual no encontrado.');
          } else if (error.status === 409) {
            alert('Ya existe un manual con ese nombre de planta.');
          } else {
            alert('Error al actualizar el manual. Intenta nuevamente.');
          }
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  deleteManual() {
    if (this.selectedManual && this.selectedManual.id) {
      this.isLoading = true;

      this.adminService.deleteManual(this.selectedManual.id).subscribe({
        next: () => {
          this.manuales = this.manuales.filter(
            (m) => m.id !== this.selectedManual!.id
          );
          this.searchManuales(); // Actualizar lista filtrada
          this.closeAllModals();
          this.isLoading = false;
          alert('Manual eliminado exitosamente!');
        },
        error: (error) => {
          console.error('Error al eliminar manual:', error);
          this.isLoading = false;
          alert('Error al eliminar el manual. Intenta nuevamente.');
        },
      });
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.manualForm.controls).forEach((key) => {
      this.manualForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.manualForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.manualForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength'])
        return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  hideImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
