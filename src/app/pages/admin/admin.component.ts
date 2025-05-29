import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  showDashboard = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchar cambios de ruta para saber cuándo mostrar el dashboard
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mostrar dashboard solo cuando estemos en /admin exactamente
        this.showDashboard = event.url === '/admin';
      });

    // Verificar ruta inicial
    this.showDashboard = this.router.url === '/admin';
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
}
