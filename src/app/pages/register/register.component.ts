import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from './register.service';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../interfaces/register.interface';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styles: `
    .fade-in {
      animation: fadeIn 0.8s ease-in-out;
    }
    
    .slide-up {
      animation: slideUp 0.6s ease-out;
    }
    
    .bounce-in {
      animation: bounceIn 0.8s ease-out;
    }
    
    .input-focus {
      transition: all 0.3s ease;
    }
    
    .input-focus:focus {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
    }
    
    .btn-hover {
      transition: all 0.3s ease;
    }
    
    .btn-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .error-message {
      animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .password-strength {
      transition: all 0.3s ease;
    }
    
    .strength-weak { color: #ef4444; }
    .strength-medium { color: #f59e0b; }
    .strength-strong { color: #10b981; }
  `,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Si el usuario ya está autenticado, redirigir según su rol
    if (this.authService.isAuthenticated()) {
      const redirectUrl = this.authService.getRedirectUrl();
      this.router.navigate([redirectUrl]);
    }
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );

    // Escuchar cambios en la contraseña para mostrar fortaleza
    this.registerForm.get('password')?.valueChanges.subscribe((value) => {
      this.passwordStrength = this.getPasswordStrength(value);
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getPasswordStrength(password: string): string {
    if (!password) return '';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 3) return 'weak';
    if (strength < 5) return 'medium';
    return 'strong';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const registerData: IRegister = {
        nombre: this.registerForm.get('nombre')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.registerService.register(registerData).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);

          // Crear el usuario - por defecto los nuevos usuarios son tipo 'user'
          let user: IUser;

          if (response.user) {
            user = response.user;
          } else {
            // Datos de ejemplo - en un caso real esto vendría del backend
            user = {
              id: response.id || Date.now(),
              nombre: registerData.nombre,
              email: registerData.email,
              role: response.role || 'user', // Por defecto, los nuevos usuarios son 'user'
            };
          }

          // Guardar usuario en el servicio de autenticación
          this.authService.setCurrentUser(user);

          // Redirigir según el rol del usuario (normalmente será /home para usuarios nuevos)
          const redirectUrl = this.authService.getRedirectUrl();
          console.log(`Redirigiendo a: ${redirectUrl} (Rol: ${user.role})`);

          this.isLoading = false;
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          console.error('Error en registro:', error);
          this.isLoading = false;
          this.errorMessage =
            'Error al crear la cuenta. Por favor, inténtalo de nuevo.';
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        const fieldNames: { [key: string]: string } = {
          nombre: 'El nombre',
          email: 'El correo',
          password: 'La contraseña',
          confirmPassword: 'La confirmación de contraseña',
        };
        return `${fieldNames[fieldName]} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un correo válido';
      }
      if (field.errors['minlength']) {
        if (fieldName === 'nombre') {
          return 'El nombre debe tener al menos 2 caracteres';
        }
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    // Error de confirmación de contraseña
    if (
      fieldName === 'confirmPassword' &&
      this.registerForm.errors?.['passwordMismatch'] &&
      field?.touched
    ) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }

  getPasswordStrengthText(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'Débil';
      case 'medium':
        return 'Media';
      case 'strong':
        return 'Fuerte';
      default:
        return '';
    }
  }

  getPasswordStrengthClass(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'strength-weak';
      case 'medium':
        return 'strength-medium';
      case 'strong':
        return 'strength-strong';
      default:
        return '';
    }
  }
}
