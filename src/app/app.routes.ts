import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumidorComponent } from './resumidor/resumidor.component';
import { ComparadorComponent } from './comparador/comparador.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resumidor', component: ResumidorComponent },
  { path: 'comparador', component: ComparadorComponent },
];

