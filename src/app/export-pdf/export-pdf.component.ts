import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-export-pdf',
  standalone: true,
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPdfComponent implements AfterViewInit, OnChanges {

  @Input() fileName: string = '';
  
  @Input() contentHtml: string = '';

  constructor(private sessionService: SessionService) {}

  
  ngAfterViewInit() {
    this.updateContent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contentHtml']) {
      this.updateContent();
    }
    
  }

  updateContent() {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.innerHTML = this.contentHtml;
    }
  }

  Screen() {
    var data = document.getElementById('content');
    // var data = this.contentHtml;
    if (data) {
      html2canvas(data).then(canvas => {
        const code = this.fileName || this.sessionService.getSessionCode();
        const imgWidth = 190; // Margins considered
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

        const margin = 10;
        const marginTop = 10; // Adjust this value for the top margin of the header
        let position = marginTop; // Starting position for content
        let position_header = marginTop; // Starting position for header

        // Header
        pdf.setFontSize(18);
        pdf.text('GDP', margin, position_header);

        // Add content
        pdf.addImage(contentDataURL, 'PNG', margin, position + 10, imgWidth, imgHeight); // Adjust position if needed

        // Footer
        const totalPages = Math.ceil(imgHeight / pageHeight);
        for (let i = 0; i < totalPages; i++) {
          pdf.setPage(i + 1);
          pdf.setFontSize(10);
          pdf.text('Página ' + (i + 1) + ' de ' + totalPages, margin, pageHeight - 10);
          pdf.text('*Este documento fue generado por inteligencia artificial.', margin, pageHeight - 5);
        }

        pdf.save(code + '.pdf'); // Generated PDF
      });
    }
  }
}
