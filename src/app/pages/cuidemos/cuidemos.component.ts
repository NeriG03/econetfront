import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManualsService } from './manuals.service';
import { Manual } from '../../interfaces/manual.interface';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-cuidemos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cuidemos.component.html',
  styleUrl: './cuidemos.component.css',
  animations: [
    // Animación de entrada principal
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),

    // Animación de entrada con stagger para elementos de lista
    trigger('staggerIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
              animate(
                '500ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    // Animación hover mejorada para cards
    trigger('cardHover', [
      state(
        'default',
        style({
          transform: 'scale(1) translateY(0)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.02) translateY(-8px)',
          boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)',
        })
      ),
      transition('default <=> hovered', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'),
      ]),
    ]),

    // Animación para el modal
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(-50px)' }),
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms cubic-bezier(0.4, 0, 1, 1)',
          style({ opacity: 0, transform: 'scale(0.8) translateY(-50px)' })
        ),
      ]),
    ]),

    // Animación de backdrop del modal
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0, backdropFilter: 'blur(0px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, backdropFilter: 'blur(12px)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, backdropFilter: 'blur(0px)' })
        ),
      ]),
    ]),

    // Animación para elementos del modal
    trigger('modalContentAnimation', [
      transition(':enter', [
        query(
          '.modal-section',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(50, [
              animate(
                '300ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    // Animación de botones con efecto bounce
    trigger('buttonPress', [
      transition('* => pressed', [
        animate('150ms ease-in', style({ transform: 'scale(0.95)' })),
        animate('150ms ease-out', style({ transform: 'scale(1)' })),
      ]),
    ]),

    // Animación de entrada para elementos individuales
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate(
          '500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),

    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(
          '500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),

    // Animación de float suave
    trigger('floatAnimation', [
      transition('* => *', [
        animate(
          '4000ms ease-in-out',
          keyframes([
            style({ transform: 'translateY(0px)', offset: 0 }),
            style({ transform: 'translateY(-10px)', offset: 0.5 }),
            style({ transform: 'translateY(0px)', offset: 1 }),
          ])
        ),
      ]),
    ]),

    // Animación de pulso para elementos importantes
    trigger('pulseGlow', [
      transition('* => *', [
        animate(
          '2000ms ease-in-out',
          keyframes([
            style({ boxShadow: '0 0 5px rgba(34, 197, 94, 0.4)', offset: 0 }),
            style({
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
              offset: 0.5,
            }),
            style({ boxShadow: '0 0 5px rgba(34, 197, 94, 0.4)', offset: 1 }),
          ])
        ),
      ]),
    ]),

    // Animación para iconos
    trigger('iconBounce', [
      transition(':enter', [
        style({ transform: 'scale(0) rotate(180deg)', opacity: 0 }),
        animate(
          '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ transform: 'scale(1) rotate(0deg)', opacity: 1 })
        ),
      ]),
    ]),

    // Animación para botones con efecto ripple
    trigger('buttonRipple', [
      state('idle', style({ transform: 'scale(1)' })),
      state('pressed', style({ transform: 'scale(0.98)' })),
      transition('idle => pressed', animate('100ms ease-in')),
      transition('pressed => idle', animate('100ms ease-out')),
    ]),
  ],
})
export class CuidemosComponent implements OnInit {
  manuales: Manual[] = [];
  filteredManuales: Manual[] = [];
  selectedManual: Manual | null = null;
  isModalOpen = false;
  isLoading = false;
  searchTerm = '';
  cardStates: { [key: number]: string } = {};

  constructor(private manualsService: ManualsService) {}

  ngOnInit(): void {
    this.loadManuales();
    this.setupScrollAnimations();
    this.initializeCardStates();
  }

  initializeCardStates(): void {
    // Inicializar todos los estados de las cards como 'default'
    this.manuales.forEach((manual) => {
      this.cardStates[manual.id || 0] = 'default';
    });
  }

  onCardMouseEnter(manualId: number): void {
    this.cardStates[manualId] = 'hovered';
  }

  onCardMouseLeave(manualId: number): void {
    this.cardStates[manualId] = 'default';
  }

  getCardState(manualId: number): string {
    return this.cardStates[manualId] || 'default';
  }

  trackByManualId(index: number, manual: Manual): number {
    return manual.id || 0;
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
        this.initializeCardStates();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar manuales:', error);
        this.isLoading = false;
        // Datos de ejemplo para desarrollo
        this.manuales = this.getExampleManuales();
        this.filteredManuales = this.manuales;
        this.initializeCardStates();
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
