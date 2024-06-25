import { Component } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';
import { MarkdownPipe } from '../markdown.pipe';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent, MarkdownPipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: Array<{ question: string, response: any }> = [];
  userInput: string = '';

  constructor(private wsService: WebSocketService, private sessionService: SessionService) {
    this.wsService.getMessages().subscribe(msg => {
      if (msg.context === 0) {
        const lastMessage = this.messages[this.messages.length - 1];
        lastMessage.response = msg;
        console.log(msg);
      }
    });
  }

  sendMessage() {
    const sessionCode = this.sessionService.getSessionCode();
    if (this.userInput.trim() && sessionCode) {
      const message = {
        message: this.userInput,
        context: 0,
        code: sessionCode
      };
      this.messages.push({ question: this.userInput, response: null });
      this.wsService.sendMessage(message);
      this.userInput = '';
    }
  }

  getInitial(text: string): string {
    return text.charAt(0).toUpperCase();
  }
}
