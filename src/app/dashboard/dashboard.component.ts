import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Lógica para mostrar el gráfico
}
