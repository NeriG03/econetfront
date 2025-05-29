import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/login.interface';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
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
  `,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData: ILogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.loginService.login(loginData).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);

          // Aquí asumimos que el backend devuelve el usuario con su rol
          // Si el backend no devuelve el usuario, crear uno de ejemplo
          let user: IUser;

          if (response.user) {
            user = response.user;
          } else {
            // Datos de ejemplo - en un caso real esto vendría del backend
            user = {
              id: response.id || 1,
              nombre: response.nombre || 'Usuario Demo',
              email: loginData.email,
              role: response.role || this.determineRoleByEmail(loginData.email),
            };
          }

          // Guardar usuario en el servicio de autenticación
          this.authService.setCurrentUser(user);

          // Redirigir según el rol del usuario
          const redirectUrl = this.authService.getRedirectUrl();
          console.log(`Redirigiendo a: ${redirectUrl} (Rol: ${user.role})`);

          this.isLoading = false;
          this.router.navigate([redirectUrl]);
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.isLoading = false;
          this.errorMessage =
            'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  // Método temporal para determinar el rol basado en el email
  // En un caso real, esto vendría del backend
  private determineRoleByEmail(email: string): string {
    // Emails de admin para testing
    const adminEmails = [
      'admin@econet.com',
      'administrador@econet.com',
      'admin@admin.com',
    ];
    return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
  }

  markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${
          fieldName === 'email' ? 'El correo' : 'La contraseña'
        } es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un correo válido';
      }
      if (field.errors['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return '';
  }
}
