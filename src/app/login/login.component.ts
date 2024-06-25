import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from '../websocket.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  messages: Array<{ question: string, response: any }> = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private wsService: WebSocketService,
    private sessionService: SessionService
  ) {
    this.wsService.getMessages().subscribe(msg => {
      if (msg.context === 4) {  // Solo maneja mensajes con context 4 en el login
        const lastMessage = this.messages[this.messages.length - 1];
        lastMessage.response = msg;
      }
    });
  }

  sendMessage(code: string) {
    const message = {
      code: code,
      context: 4  // Contexto para el login
    };
    this.wsService.sendMessage(message);
  }

  makeRandom(lengthOfCode: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\\=-)(*&^%$#@!~`";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  onLogin(): void {
    const randomCode = this.makeRandom(15);
    this.sessionService.setSessionCode(randomCode);
    this.sendMessage(randomCode);

    this.router.navigate(['/dashboard']);
  }

  onForgotPassword(): void {
    this.showNotification('Aún no implementamos esta función');
  }

  onGoogleLogin(): void {
    this.showNotification('Aún no implementamos esta función');
  }

  onOtherLogin(): void {
    this.showNotification('Aún no implementamos esta función');
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
