import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CuidemosComponent } from './pages/cuidemos/cuidemos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cuidemos',
        component: CuidemosComponent
    },
    {
        path: 'noticias',
        component: NoticiasComponent
    },
    {
        path: 'contacto',
        component: ContactoComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
