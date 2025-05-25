import { Component } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { itemNavbar } from '../../interfaces/interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [
    `
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(-10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
  standalone: true,
})
export class NavbarComponent {
  isMobileMenuOpen: boolean = false;

  listaMenu: itemNavbar[] = [
    {
      title: 'Home',
      url: '/home',
    } /* 
    {
      title: 'Cuidemos',
      url: '/cuidemos',
    }, */,
    // {
    //   title: 'noticias',
    //   url: '/noticias'
    // }
    {
      title: 'Contacto',
      url: '/contacto',
    },
  ];

  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentUrl = this.router.url;
    return !currentUrl.includes('/login') && !currentUrl.includes('/register');
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
