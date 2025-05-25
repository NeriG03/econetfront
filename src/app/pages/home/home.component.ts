import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
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
    
    /* Efectos de parallax */
    .parallax-bg {
      transform: translateZ(0);
      will-change: transform;
    }
  `,
})
export class HomeComponent implements OnInit {
  cards = [
    {
      id: 1,
      title: 'Objetivo',
      description:
        'Promover la concientización sobre el cuidado del medio ambiente a través de la tecnología.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Destacado',
      delay: '0s',
    },
    {
      id: 2,
      title: 'Misión',
      description:
        'Crear una comunidad global comprometida con prácticas sostenibles y el cuidado de la naturaleza.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Importante',
      delay: '0.2s',
    },
    {
      id: 3,
      title: 'Visión',
      description:
        'Un mundo donde la tecnología y la naturaleza coexistan en perfecta armonía y equilibrio.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Prioritario',
      delay: '0.4s',
    },
    {
      id: 4,
      title: 'ODS',
      description:
        'Alineados con los Objetivos de Desarrollo Sostenible de las Naciones Unidas para un futuro mejor.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Estratégico',
      delay: '0.6s',
    },
    {
      id: 5,
      title: 'Alcances',
      description:
        'Nuestro impacto se extiende desde comunidades locales hasta ecosistemas globales.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Clave',
      delay: '0.8s',
    },
    {
      id: 6,
      title: 'Metas',
      description:
        'Objetivos claros y medibles para construir un futuro sostenible para las próximas generaciones.',
      image: 'https://iili.io/3YmETRR.png',
      badge: 'Esencial',
      delay: '1s',
    },
  ];

  ngOnInit(): void {
    this.setupScrollAnimations();
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

    // Observar elementos con la clase scroll-reveal
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);
  }

  onCardClick(cardId: number): void {
    console.log(`Card ${cardId} clicked`);
    // Aquí puedes agregar lógica específica para cada card
  }
}
