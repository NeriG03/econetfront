import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManualsService } from './manuals.service';
import { Manual } from '../../interfaces/manual.interface';

@Component({
  selector: 'app-cuidemos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cuidemos.component.html',
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
    
    /* Modal styles */
    .modal-backdrop {
      backdrop-filter: blur(8px);
      background: rgba(0, 0, 0, 0.5);
    }
    
    .modal-content {
      max-height: 90vh;
      overflow-y: auto;
    }
    
    /* Search styles */
    .search-highlight {
      background: linear-gradient(120deg, #fbbf24 0%, #f59e0b 100%);
      padding: 2px 4px;
      border-radius: 4px;
      font-weight: bold;
    }
  `,
})
export class CuidemosComponent implements OnInit {
  manuales: Manual[] = [];
  filteredManuales: Manual[] = [];
  selectedManual: Manual | null = null;
  isModalOpen = false;
  isLoading = false;
  searchTerm = '';

  constructor(private manualsService: ManualsService) {}

  ngOnInit(): void {
    this.loadManuales();
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

    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);
  }

  loadManuales(): void {
    this.isLoading = true;
    console.log('Cargando manuales...');

    this.manualsService.getManuals().subscribe({
      next: (manuales) => {
        console.log('Manuales recibidos:', manuales);
        this.manuales = manuales || [];
        this.filteredManuales = this.manuales;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar manuales:', error);
        this.isLoading = false;
        // Datos de ejemplo para desarrollo
        this.manuales = this.getExampleManuales();
        this.filteredManuales = this.manuales;
      },
    });
  }

  searchManuales(): void {
    if (!this.searchTerm.trim()) {
      this.filteredManuales = this.manuales;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredManuales = this.manuales.filter(
        (manual) =>
          manual.planta.toLowerCase().includes(searchLower) ||
          manual.luz.toLowerCase().includes(searchLower) ||
          manual.riego.toLowerCase().includes(searchLower) ||
          manual.humedad.toLowerCase().includes(searchLower) ||
          manual.temperatura.toLowerCase().includes(searchLower) ||
          manual.abono.toLowerCase().includes(searchLower) ||
          manual.poda.toLowerCase().includes(searchLower) ||
          manual.trasplante.toLowerCase().includes(searchLower) ||
          manual.enfermedades.toLowerCase().includes(searchLower) ||
          (manual.otros && manual.otros.toLowerCase().includes(searchLower))
      );
    }
  }

  openModal(manual: Manual): void {
    this.selectedManual = manual;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedManual = null;
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  getExampleManuales(): Manual[] {
    return [
      {
        id: 1,
        planta: 'Rosa',
        luz: 'Necesita luz solar directa al menos 6 horas al día. Prefiere la luz matutina.',
        riego:
          'Regar 2-3 veces por semana en verano, 1-2 veces en invierno. El suelo debe estar húmedo pero no encharcado.',
        humedad:
          'Humedad moderada del 40-60%. Evitar mojar las hojas para prevenir hongos.',
        temperatura:
          'Temperatura ideal entre 15-25°C. Resistente a heladas ligeras.',
        abono:
          'Fertilizar cada 2 semanas en primavera y verano con abono rico en fósforo.',
        poda: 'Podar en invierno eliminando ramas secas y débiles. Cortar por encima de una yema.',
        trasplante:
          'Trasplantar cada 2-3 años en primavera. Usar tierra rica en materia orgánica.',
        enfermedades:
          'Susceptible a pulgones, ácaros y hongos. Tratar con fungicidas preventivos.',
        otros:
          'Plantar en grupos para mejor efecto visual. Combina bien con lavanda.',
        imagen:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500',
        user: 1,
      },
      {
        id: 2,
        planta: 'Cactus Barrel',
        luz: 'Requiere luz solar intensa y directa durante todo el día.',
        riego:
          'Regar muy poco, solo cuando el suelo esté completamente seco. En invierno casi no regar.',
        humedad: 'Prefiere ambiente seco, humedad baja del 20-30%.',
        temperatura: 'Tolera temperaturas altas hasta 40°C y bajas hasta 5°C.',
        abono: 'Fertilizar una vez al mes en verano con abono para cactáceas.',
        poda: 'No requiere poda, solo remover partes dañadas con herramientas esterilizadas.',
        trasplante:
          'Trasplantar cada 3-4 años usando sustrato específico para cactus.',
        enfermedades:
          'Resistente a plagas. Cuidado con el exceso de agua que causa pudrición.',
        otros: 'Ideal para jardines xerófitos y colecciones de suculentas.',
        imagen:
          'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
        user: 1,
      },
      {
        id: 3,
        planta: 'Helecho Boston',
        luz: 'Luz indirecta brillante. Evitar sol directo que quema las hojas.',
        riego:
          'Mantener suelo constantemente húmedo pero no encharcado. Regar cuando la superficie esté seca.',
        humedad:
          'Requiere alta humedad del 60-80%. Usar humidificador o bandeja con agua.',
        temperatura:
          'Temperatura constante entre 18-24°C. Evitar corrientes de aire.',
        abono:
          'Fertilizar mensualmente en primavera y verano con abono líquido diluido.',
        poda: 'Remover frondas amarillas y secas regularmente. Cortar desde la base.',
        trasplante:
          'Trasplantar anualmente en primavera usando tierra rica en turba.',
        enfermedades: 'Susceptible a cochinillas y ácaros en ambiente seco.',
        otros: 'Excelente purificador de aire. Ideal para baños y cocinas.',
        imagen:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
        user: 1,
      },
      {
        id: 4,
        planta: 'Lavanda',
        luz: 'Necesita pleno sol, mínimo 6-8 horas de luz directa diaria.',
        riego:
          'Riego moderado, dejar secar entre riegos. Resistente a la sequía una vez establecida.',
        humedad:
          'Prefiere ambiente seco, buena ventilación. Evitar humedad excesiva.',
        temperatura: 'Muy resistente, tolera desde -10°C hasta 35°C.',
        abono:
          'Poco fertilizante, solo compost ligero en primavera. Exceso de nutrientes reduce aroma.',
        poda: 'Podar después de la floración, cortar 1/3 de la planta para mantener forma.',
        trasplante:
          'Trasplantar en primavera cada 3-4 años. Prefiere suelo bien drenado.',
        enfermedades:
          'Muy resistente. Ocasionalmente puede tener hongos por exceso de humedad.',
        otros: 'Atrae abejas y mariposas. Usar flores secas para aromaterapia.',
        imagen:
          'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=500',
        user: 1,
      },
      {
        id: 5,
        planta: 'Monstera Deliciosa',
        luz: 'Luz indirecta brillante. Puede tolerar algo de sombra.',
        riego:
          'Regar cuando los primeros 2-3 cm de tierra estén secos. Evitar encharcamiento.',
        humedad: 'Humedad alta del 60-70%. Rociar hojas ocasionalmente.',
        temperatura: 'Temperatura ideal entre 20-25°C. Mínimo 15°C.',
        abono:
          'Fertilizar mensualmente en primavera y verano con abono líquido balanceado.',
        poda: 'Podar hojas amarillas y guiar con tutor para crecimiento vertical.',
        trasplante:
          'Trasplantar cada 2 años en primavera usando tierra rica y bien drenada.',
        enfermedades:
          'Susceptible a cochinillas y ácaros. Limpiar hojas regularmente.',
        otros:
          'Planta trepadora, necesita soporte. Las hojas desarrollan agujeros naturalmente.',
        imagen:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
        user: 1,
      },
      {
        id: 6,
        planta: 'Suculenta Echeveria',
        luz: 'Luz solar directa o muy brillante. Mínimo 4-6 horas diarias.',
        riego:
          'Riego profundo pero poco frecuente. Dejar secar completamente entre riegos.',
        humedad: 'Ambiente seco, humedad baja del 20-40%.',
        temperatura: 'Tolera amplio rango, desde 5°C hasta 30°C.',
        abono:
          'Fertilizar 2-3 veces al año con abono para suculentas muy diluido.',
        poda: 'Remover hojas secas de la base. Cortar tallos florales después de floración.',
        trasplante:
          'Trasplantar cada 2-3 años usando sustrato específico para suculentas.',
        enfermedades:
          'Resistente. Cuidado con cochinillas y pudrición por exceso de agua.',
        otros:
          'Fácil propagación por hojas. Ideal para principiantes en jardinería.',
        imagen:
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
        user: 1,
      },
    ];
  }

  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  getShortDescription(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }
}
