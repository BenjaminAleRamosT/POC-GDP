import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ChatComponent, LoginComponent, DashboardComponent, ExportPdfComponent, CustomSelectComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = true;
  isChatOpen: boolean = false; // Estado del chat

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }

  private checkRoute(): void {
    const currentRoute = this.activatedRoute.root.firstChild?.snapshot.routeConfig?.path || '';
    this.isLogged = currentRoute !== '';
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
