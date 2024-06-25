import { Pipe, PipeTransform } from '@angular/core';
import * as showdown from 'showdown';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  private converter = new showdown.Converter();

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Eliminar las fuentes que aparecen en corchetes
    const cleanValue = value.replace(/\[\d+:\d+†source\]/g, '');

    // Convertir Markdown a HTML
    return this.converter.makeHtml(cleanValue);
  }
}
