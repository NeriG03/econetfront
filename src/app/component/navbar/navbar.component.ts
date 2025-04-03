import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { itemNavbar } from '../../interfaces/interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  listaMenu: itemNavbar[]=[
    {
      title: 'home',
      url: '/home'
    },
    // {
    //   title: 'cuidemos',
    //   url: '/cuidemos'
    // },
    // {
    //   title: 'noticias',
    //   url: '/noticias'
    // }
    {
      title: 'contáctanos',
      url: '/contacto'
    },
    {
      title: 'login',
      url: '/login'
    },
    {
      title: 'register',
      url: '/register'
    }
  ]
}
