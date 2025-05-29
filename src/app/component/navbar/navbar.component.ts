import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { itemNavbar } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen: boolean = false;
  currentUser: IUser | null = null;
  private userSubscription?: Subscription;

  listaMenu: itemNavbar[] = [
    {
      title: 'Home',
      url: '/home',
    },
    {
      title: 'Contacto',
      url: '/contacto',
    },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del usuario actual
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.updateMenuForUserRole();
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private updateMenuForUserRole(): void {
    if (this.currentUser?.role === 'admin') {
      // Menú para admin
      this.listaMenu = [
        {
          title: 'Dashboard',
          url: '/admin',
        },
        {
          title: 'Home',
          url: '/home',
        },
        {
          title: 'Contacto',
          url: '/contacto',
        },
      ];
    } else {
      // Menú para usuario normal
      this.listaMenu = [
        {
          title: 'Home',
          url: '/home',
        },
        {
          title: 'Cuidemos',
          url: '/cuidemos',
        },
        {
          title: 'Actividades',
          url: '/actividades',
        },
        {
          title: 'Contacto',
          url: '/contacto',
        },
      ];
    }
  }

  shouldShowNavbar(): boolean {
    const currentUrl = this.router.url;
    return !currentUrl.includes('/login') && !currentUrl.includes('/register');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getMobileIcon(title: string): string {
    const iconMap: { [key: string]: string } = {
      Home: 'fa-home',
      Contacto: 'fa-envelope',
      Cuidemos: 'fa-leaf',
      Actividades: 'fa-calendar-check',
      Dashboard: 'fa-tachometer-alt',
      Noticias: 'fa-newspaper',
    };
    return iconMap[title] || 'fa-circle';
  }

  getUserInitials(): string {
    if (!this.currentUser?.nombre) return 'U';
    const names = this.currentUser.nombre.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return this.currentUser.nombre[0].toUpperCase();
  }

  getUserRoleDisplay(): string {
    if (!this.currentUser?.role) return '';
    return this.currentUser.role === 'admin' ? 'Administrador' : 'Usuario';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isMobileMenuOpen = false;
  }
}
