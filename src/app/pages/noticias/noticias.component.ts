import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from './noticias.service';
import { Notice } from '../../interfaces/notice.interface';
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
  selector: 'app-noticias',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
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
    trigger('rippleEffect', [
      transition('* => clicked', [
        style({ transform: 'scale(1)' }),
        animate(
          '300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          keyframes([
            style({ transform: 'scale(0.95)', offset: 0.3 }),
            style({ transform: 'scale(1.02)', offset: 0.7 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),

    // Animación para carga de contenido
    trigger('contentLoad', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '400ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),

    // Animación para elementos que aparecen al hacer scroll
    trigger('scrollReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '800ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class NoticiasComponent implements OnInit {
  noticias: Notice[] = [];
  filteredNoticias: Notice[] = [];
  selectedNoticia: Notice | null = null;
  isModalOpen = false;
  isLoading = false;
  searchTerm = '';
  cardStates: { [key: number]: string } = {};

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNoticias();
    this.initializeCardStates();
    this.setupScrollAnimations();
  }

  initializeCardStates(): void {
    // Inicializar todos los estados de las cards como 'default'
    this.noticias.forEach((noticia) => {
      if (noticia.id) {
        this.cardStates[noticia.id] = 'default';
      }
    });
  }

  onCardMouseEnter(noticiaId: number): void {
    this.cardStates[noticiaId] = 'hovered';
  }

  onCardMouseLeave(noticiaId: number): void {
    this.cardStates[noticiaId] = 'default';
  }

  getCardState(noticiaId: number): string {
    return this.cardStates[noticiaId] || 'default';
  }

  trackByNoticiaId(index: number, noticia: Notice): number {
    return noticia.id || index;
  }

  setupScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observar elementos que queremos animar al hacer scroll
    setTimeout(() => {
      const elementsToAnimate = document.querySelectorAll('.scroll-animate');
      elementsToAnimate.forEach((el) => observer.observe(el));
    }, 100);
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        // Filtrar solo noticias activas para el frontend público
        this.noticias = data.filter((noticia) => noticia.activo);
        this.filteredNoticias = [...this.noticias];
        this.initializeCardStates();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading noticias:', error);
        // En caso de error, mostrar noticias de ejemplo
        this.noticias = this.getExampleNoticias();
        this.filteredNoticias = [...this.noticias];
        this.initializeCardStates();
        this.isLoading = false;
      },
    });
  }

  searchNoticias(): void {
    if (!this.searchTerm.trim()) {
      this.filteredNoticias = [...this.noticias];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredNoticias = this.noticias.filter((noticia) => {
      const titleMatch = noticia.title.toLowerCase().includes(searchTermLower);
      const descriptionMatch = noticia.description
        .toLowerCase()
        .includes(searchTermLower);

      return titleMatch || descriptionMatch;
    });
  }

  openModal(noticia: Notice): void {
    this.selectedNoticia = noticia;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNoticia = null;
    document.body.style.overflow = 'auto';
  }

  getExampleNoticias(): Notice[] {
    return [
      {
        id: 1,
        title:
          'Así es la lucha por recuperar el litoral valenciano meses después de la Dana',
        description:
          'Voluntarios y autoridades continúan con los esfuerzos de limpieza y restauración de las playas afectadas por el desastre natural. Los trabajos de recuperación incluyen la replantación de vegetación autóctona, la limpieza de residuos marinos y la rehabilitación de ecosistemas costeros dañados.',
        img: 'https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2023/10/08/limpieza-playas-tras-la-dana-en-valencia.jpeg',
        activo: true,
        user: 1,
      },
      {
        id: 2,
        title: 'Y si el tiburón de Groenlandia nos ayudara a vivir más años',
        description:
          'Científicos estudian la extraordinaria longevidad de esta especie que puede vivir más de 400 años y sus posibles aplicaciones médicas. Los investigadores han descubierto proteínas especiales en su organismo que podrían ser clave para entender el envejecimiento y desarrollar nuevas terapias anti-edad.',
        img: 'https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic515213.jpg?w=1600',
        activo: true,
        user: 1,
      },
      {
        id: 3,
        title:
          'Avances en energías renovables para combatir el cambio climático',
        description:
          'Nuevas tecnologías solares y eólicas prometen revolucionar el mercado energético con mayor eficiencia y menor coste. Los últimos desarrollos incluyen paneles solares de perovskita que alcanzan eficiencias superiores al 25% y turbinas eólicas flotantes que pueden aprovecharse en aguas profundas.',
        img: 'https://www.nationalgeographic.com.es/medio/2023/03/20/energiasrenovables_d8b91aea_1280x720.jpg',
        activo: true,
        user: 1,
      },
      {
        id: 4,
        title: 'El papel crucial de los bosques en la captura de carbono',
        description:
          'Nuevos estudios revelan la importancia vital de los ecosistemas forestales en la lucha contra el cambio climático. Los bosques maduros pueden almacenar hasta 300 toneladas de carbono por hectárea, mientras que los programas de reforestación muestran resultados prometedores en diferentes regiones del mundo.',
        img: 'https://www.nationalgeographic.com.es/medio/2020/07/13/bosque_f4b7ad8d_1280x720.jpg',
        activo: true,
        user: 1,
      },
      {
        id: 5,
        title:
          'Innovaciones en agricultura sostenible transforman la producción de alimentos',
        description:
          'Las técnicas de agricultura vertical y los sistemas de riego inteligente están revolucionando la forma en que producimos alimentos. Estas innovaciones permiten reducir el uso de agua hasta en un 95% mientras aumentan la productividad y minimizan el impacto ambiental.',
        img: 'https://www.nationalgeographic.com.es/medio/2021/05/17/agricultura-sostenible_7c8a4f8e_1280x720.jpg',
        activo: true,
        user: 1,
      },
      {
        id: 6,
        title: 'La biodiversidad marina: un tesoro en peligro',
        description:
          'Los océanos albergan una increíble diversidad de especies, muchas de las cuales aún no han sido descubiertas. Sin embargo, la contaminación, la sobrepesca y el cambio climático amenazan estos ecosistemas únicos. Nuevas iniciativas de conservación buscan proteger estos hábitats críticos.',
        img: 'https://www.nationalgeographic.com.es/medio/2020/11/23/coral_f8b4d5a6_1280x720.jpg',
        activo: true,
        user: 1,
      },
    ];
  }

  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(
      regex,
      '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
    );
  }

  getShortDescription(text: string, maxLength: number = 120): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  }

  formatDate(dateString?: string): string {
    if (!dateString) {
      return 'Fecha no disponible';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getRandomCategory(): string {
    const categories = [
      'Actualidad',
      'Ciencia',
      'Tecnología',
      'Medio Ambiente',
      'Biodiversidad',
      'Sostenibilidad',
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  onImageError(event: any): void {
    event.target.src =
      'https://via.placeholder.com/400x300/10b981/ffffff?text=Imagen+no+disponible';
  }

  onModalImageError(event: any): void {
    event.target.src =
      'https://via.placeholder.com/800x400/10b981/ffffff?text=Imagen+no+disponible';
  }
}
