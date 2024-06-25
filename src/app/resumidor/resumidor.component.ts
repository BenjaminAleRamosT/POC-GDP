import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownPipe } from '../markdown.pipe';
import { SessionService } from '../session.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExportPdfComponent } from '../export-pdf/export-pdf.component';
import { SendButtonComponent } from '../send-button/send-button.component';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { SelectionService } from '../selection.service'; // Asegúrate de que la ruta es correcta
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-resumidor',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe, MatProgressSpinnerModule, ExportPdfComponent, SendButtonComponent, CustomSelectComponent, HeaderComponent],
  templateUrl: './resumidor.component.html',
  styleUrls: ['./resumidor.component.scss']
})
export class ResumidorComponent implements OnInit  {
  selectedOption: string = '';
  response: any;
  loading: boolean = false;
  pdfName: string = 'resumen_';
  message: string =  `Resume el archivo financiero de ${this.selectedOption} sin considerar información de las otras compañías y los archivos que no sean de esta institución. Dame los puntos más importantes con cifras que respalden.`;

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
      if (msg.context === 1) {  // Solo maneja mensajes con context 1 en el resumidor
        this.response = msg.natural_response;
        this.loading = false;
      }
    });
  }
  ngOnInit() {
    this.selectionService.selections$.subscribe(selections => {
      this.selectedOption = selections['option'] || '';
      console.log('Selected options:', this.selectedOption);
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
    if (this.selectedOption.trim() && sessionCode) {
      const message = {
        message: `Resume el archivo financiero de ${this.selectedOption} sin considerar información de las otras compañías y los archivos que no sean de esta institución. Dame los puntos más importantes con cifras que respalden.`,
        context: 1,  // Contexto para el resumidor
        code: sessionCode,  // Añadir el código de sesión
        files: [this.selectedOption.trim().toLowerCase()]
      };
      this.loading = true;
      this.wsService.sendMessage(message);
    }
  }
}