import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SelectionService } from '../selection.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() selectionKey: string =''; // Clave única para cada selector

  options = [
    { name: 'BanChile', icon: 'fa-solid fa-file-pdf', color: '#000' },
    { name: 'BCI', icon: 'fa-solid fa-file-pdf', color: '#ea4c89' },
    { name: 'Fintual', icon: 'fa-solid fa-file-pdf', color: '#0057ff' },
    { name: 'Santander', icon: 'fa-solid fa-file-pdf', color: '#32c766' },
  ];

  constructor(private selectionService: SelectionService) {}

  closeSelect() {
    (document.getElementById('options-view-button') as HTMLInputElement).checked = false;
  }

  onOptionChange(option: string) {
    if (option && this.selectionKey) {
      this.selectionService.setSelection(this.selectionKey, option);
    }
  }
}
