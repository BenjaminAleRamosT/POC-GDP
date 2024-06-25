import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownPipe } from '../markdown.pipe';
import { SessionService } from '../session.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExportPdfComponent } from '../export-pdf/export-pdf.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { SelectionService } from '../selection.service'; // Asegúrate de que la ruta es correcta
import { SendButtonComponent } from '../send-button/send-button.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-comparador',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe, MatProgressSpinnerModule, ExportPdfComponent,SendButtonComponent, CustomSelectComponent, HeaderComponent],
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.scss']
})
export class ComparadorComponent implements OnInit {
  option1: string = '';
  option2: string = '';
  response: any;
  loading: boolean = false;
  pdfName: string = 'comparacion_';
  message: string = `Compara los archivos financieros de ${this.option1} y ${this.option2} tomando los elementos más fundamentales de cada uno y sus resultados. No te centres en darme tantos números, dame los fundamentales y donde se diferencian (tanto en resultados como en forma de obtenerlo). No me des tablas.`;

  ejemplo: string = `
  <h1>Export this content to PDF</h1>
  <p>Include any HTML content you want to export here.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
`;

  constructor(private wsService: WebSocketService, private sessionService: SessionService, private selectionService: SelectionService) {
    this.wsService.getMessages().subscribe(msg => {
      if (msg.context === 2) {  // Solo maneja mensajes con context 2 en el comparador
        this.response = msg.natural_response;
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.selectionService.selections$.subscribe(selections => {
      this.option1 = selections['option1'] || '';
      this.option2 = selections['option2'] || '';
      console.log('Selected options:', this.option1, this.option2);
    });
  }

  handleSendComplete(event: any) {
    if (event.success) {
      this.response = event.response;
      console.log('llego')
      console.log(this.response )
      // Manejar el mensaje enviado exitosamente
    } else {
      this.response = 'Error'
      // Manejar el fallo en el envío del mensaje
    }
  }


  onSend() {
    const sessionCode = this.sessionService.getSessionCode();
    if (this.option1 && this.option2 && this.option1 !== this.option2 && sessionCode) {
      const message = {
        message: `Compara los archivos financieros de ${this.option1} y ${this.option2} tomando los elementos más fundamentales de cada uno y sus resultados. No te centres en darme tantos números, dame los fundamentales y donde se diferencian (tanto en resultados como en forma de obtenerlo). No me des tablas.`,
        context: 2,  // Contexto para el comparador
        code: sessionCode,  // Añadir el código de sesión
        files: [this.option1.trim().toLowerCase(), this.option2.trim().toLowerCase()]  // Añadir archivos
      };
      this.loading = true;
      this.wsService.sendMessage(message);
    }
  }
}
