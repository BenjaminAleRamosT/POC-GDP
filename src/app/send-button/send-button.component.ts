import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SessionService } from '../session.service';
import { WebSocketService } from '../websocket.service'; // Actualiza la ruta según corresponda

@Component({
  selector: 'app-send-button',
  standalone: true,
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss']
})
export class SendButtonComponent implements AfterViewInit {
  @Input() selectedOption: string | string[] = '';
  @Input() messageText: string = '';
  @Input() messageContext: number = 1;
  @Output() sendComplete: EventEmitter<any> = new EventEmitter();

  response: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private sessionService: SessionService, private wsService: WebSocketService) {
    this.wsService.getMessages().subscribe(msg => {
      if (msg.context === this.messageContext) {  // Solo maneja mensajes con el contexto adecuado
        const button = this.el.nativeElement.querySelector('.activate');
        this.response = msg.natural_response;
        // Emitir el evento con el valor deseado
        this.sendComplete.emit({ success: true, response: this.response });
        console.log(this.response);

        this.renderer.addClass(button, 'done');
        setTimeout(() => {
          this.renderer.removeClass(button, 'loading');
          this.renderer.removeClass(button, 'done');
        }, 3200);
      }
    });
  }

  ngAfterViewInit() {
    const button = this.el.nativeElement.querySelector('.activate');
    this.renderer.listen(button, 'click', this.handleClick.bind(this));
    this.renderer.listen(button, 'touch', this.handleClick.bind(this));
  }

  handleClick() {
    const sessionCode = this.sessionService.getSessionCode();
    if (Array.isArray(this.selectedOption)) {
      // Caso para array de dos strings
      const [option1, option2] = this.selectedOption;
      if (option1.trim() && option2.trim() && option1 !== option2 && sessionCode) {
        const message = {
          message: `Compara los archivos financieros de ${option1} y ${option2} tomando los elementos más fundamentales de cada uno y sus resultados. No te centres en darme tantos números, dame los fundamentales y donde se diferencian (tanto en resultados como en forma de obtenerlo). No me des tablas.`,
          context: 2,  // Contexto para el comparador
          code: sessionCode,  // Añadir el código de sesión
          files: [option1.trim().toLowerCase(), option2.trim().toLowerCase()]  // Añadir archivos
        };
        this.sendMessage(message);
      }
    } else {
      // Caso para un solo string
      if (this.selectedOption.trim() && sessionCode) {
        const message = {
          message: this.messageText,
          context: this.messageContext,
          code: sessionCode,
          files: [this.selectedOption.trim().toLowerCase()]
        };
        this.sendMessage(message);
      }
    }
  }

  private sendMessage(message: any) {
    console.log(message);
    this.wsService.sendMessage(message);

    const button = this.el.nativeElement.querySelector('.activate');
    if (!button.classList.contains('loading')) {
      this.renderer.addClass(button, 'loading');
    }
  }
}
