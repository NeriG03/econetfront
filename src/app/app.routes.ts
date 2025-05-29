import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CuidemosComponent } from './pages/cuidemos/cuidemos.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminManualesComponent } from './pages/admin/admin-manuales/admin-manuales.component';
import { AdminNoticesComponent } from './pages/admin/admin-notices/admin-notices.component';
import { AdminActivitiesComponent } from './pages/admin/admin-activities/admin-activities.component';
import { UserActivitiesComponent } from './pages/user-activities/user-activities.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuidemos',
    component: CuidemosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'actividades',
    component: UserActivitiesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'manuales',
        component: AdminManualesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'noticias',
        component: AdminNoticesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'actividades',
        component: AdminActivitiesComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
