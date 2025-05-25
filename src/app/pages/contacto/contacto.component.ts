import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styles: `
    /* Animaciones de entrada */
    .fade-in {
      animation: fadeIn 1s ease-in-out;
    }
    
    .slide-up {
      animation: slideUp 0.8s ease-out;
    }
    
    .slide-in-left {
      animation: slideInLeft 0.8s ease-out;
    }
    
    .slide-in-right {
      animation: slideInRight 0.8s ease-out;
    }
    
    .bounce-in {
      animation: bounceIn 1.2s ease-out;
    }
    
    .scale-in {
      animation: scaleIn 0.6s ease-out;
    }
    
    /* Animaciones constantes */
    .float {
      animation: float 6s ease-in-out infinite;
    }
    
    .pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
    
    .rotate-slow {
      animation: rotateSlow 20s linear infinite;
    }
    
    .wave {
      animation: wave 4s ease-in-out infinite;
    }
    
    .shimmer {
      animation: shimmer 2s linear infinite;
    }
    
    .typing {
      animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
    }
    
    /* Efectos hover mejorados */
    .card-hover {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .card-hover:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(34, 197, 94, 0.2);
    }
    
    .btn-hover {
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .btn-hover::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .btn-hover:hover::before {
      left: 100%;
    }
    
    .btn-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
    }
    
    .input-focus {
      transition: all 0.3s ease;
    }
    
    .input-focus:focus {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
    }
    
    /* Gradientes animados */
    .gradient-bg {
      background: linear-gradient(-45deg, #10b981, #059669, #047857, #065f46);
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    }
    
    .gradient-text {
      background: linear-gradient(-45deg, #10b981, #059669, #047857, #065f46);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 6s ease infinite;
    }
    
    /* Partículas flotantes */
    .particle {
      position: absolute;
      background: rgba(34, 197, 94, 0.1);
      border-radius: 50%;
      pointer-events: none;
    }
    
    .particle-1 {
      width: 4px;
      height: 4px;
      top: 20%;
      left: 10%;
      animation: float 8s ease-in-out infinite;
    }
    
    .particle-2 {
      width: 6px;
      height: 6px;
      top: 60%;
      right: 15%;
      animation: float 10s ease-in-out infinite reverse;
    }
    
    .particle-3 {
      width: 3px;
      height: 3px;
      top: 80%;
      left: 70%;
      animation: float 12s ease-in-out infinite;
    }
    
    .particle-4 {
      width: 5px;
      height: 5px;
      top: 40%;
      left: 80%;
      animation: float 14s ease-in-out infinite;
    }
    
    /* Keyframes */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(50px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0;
        transform: translateX(-50px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0;
        transform: translateX(50px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
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
    
    @keyframes scaleIn {
      from { 
        opacity: 0;
        transform: scale(0.8);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
      }
      50% { 
        box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
      }
    }
    
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      75% { transform: rotate(-5deg); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: #10b981; }
    }
    
    /* Efectos de scroll */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Efectos especiales */
    .glass-effect {
      backdrop-filter: blur(16px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .neon-glow {
      box-shadow: 0 0 5px #10b981, 0 0 10px #10b981, 0 0 15px #10b981;
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
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;

  teamMembers = [
    {
      id: 1,
      name: 'Antonio Bautista Cuevas',
      role: 'Full Stack Developer',
      email: '014421768@ulsaoaxaca.edu.mx',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      specialties: ['Frontend', 'Backend', 'Database'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
      },
      delay: '0s',
    },
    {
      id: 2,
      name: 'Vicente Barrera Colin',
      role: 'UI/UX Designer',
      email: '014433600@ulsaoaxaca.edu.mx',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      specialties: ['Design', 'Prototyping', 'User Research'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
      },
      delay: '0.2s',
    },
    {
      id: 3,
      name: 'Neri Uriel Sosa Villanueva',
      role: 'DevOps Engineer',
      email: '014430660@ulsaoaxaca.edu.mx',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      specialties: ['Cloud', 'CI/CD', 'Infrastructure'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
      },
      delay: '0.4s',
    },
    {
      id: 4,
      name: 'Diego Sosa Ramírez',
      role: 'Data Scientist',
      email: '014430779@ulsaoaxaca.edu.mx',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
      specialties: ['Machine Learning', 'Analytics', 'AI'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
      },
      delay: '0.6s',
    },
  ];

  contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'contact@econet.io',
      description: 'Envíanos un mensaje',
    },
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      value: '+52 951 123 4567',
      description: 'Llámanos directamente',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Ubicación',
      value: 'Oaxaca, México',
      description: 'Visítanos en persona',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.setupScrollAnimations();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  setupScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;

      // Simular envío de formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm.value);
        this.isLoading = false;
        this.contactForm.reset();
        // Aquí puedes agregar lógica para enviar el formulario
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        const fieldNames: { [key: string]: string } = {
          name: 'El nombre',
          email: 'El correo',
          subject: 'El asunto',
          message: 'El mensaje',
        };
        return `${fieldNames[fieldName]} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un correo válido';
      }
      if (field.errors['minlength']) {
        const minLengths: { [key: string]: number } = {
          name: 2,
          subject: 5,
          message: 10,
        };
        return `Debe tener al menos ${minLengths[fieldName]} caracteres`;
      }
    }
    return '';
  }

  onMemberClick(memberId: number): void {
    console.log(`Miembro ${memberId} seleccionado`);
    // Aquí puedes agregar lógica específica para cada miembro
  }

  copyEmail(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      console.log('Email copiado:', email);
      // Aquí puedes mostrar una notificación
    });
  }
}
