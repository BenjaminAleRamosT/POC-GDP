import { Component, OnInit, Renderer2, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() message: string | undefined;
  private chartId: string;

  constructor(private renderer: Renderer2, private el: ElementRef) { 
    this.chartId = 'chart-' + Math.random().toString(36).substr(2, 9);
  }

  ngOnInit(): void {
    // Aquí no hacemos nada con el mensaje porque puede no estar inicializado todavía
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.processMessage(this.message);
    }
  }

  processMessage(message: string): void {
    // Eliminar cualquier gráfico anterior en este contenedor específico
    const existingChartContainer = this.el.nativeElement.querySelector(`#${this.chartId}`);
    if (existingChartContainer) {
      this.renderer.removeChild(this.el.nativeElement, existingChartContainer);
    }

    // Crear el contenedor para el gráfico con un ID único
    const newChartContainer = this.renderer.createElement('div');
    this.renderer.setProperty(newChartContainer, 'id', this.chartId);
    this.renderer.appendChild(this.el.nativeElement, newChartContainer);

    // Cargar el script de Plotly si no está ya cargado
    if (!(window as any).Plotly) {
      const plotlyScript = this.renderer.createElement('script');
      plotlyScript.src = 'https://cdn.plot.ly/plotly-2.32.0.min.js';
      plotlyScript.onload = () => {
        this.executeScriptContent(message, this.chartId);
      };
      this.renderer.appendChild(this.el.nativeElement, plotlyScript);
    } else {
      this.executeScriptContent(message, this.chartId);
    }
  }

  executeScriptContent(message: string, chartId: string): void {
    const scriptContent = this.extractScriptContent(message);
    if (scriptContent) {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.text = scriptContent.replace(/Plotly\.newPlot\(\s*'[^']*'/, `Plotly.newPlot('${chartId}'`);
      this.renderer.appendChild(this.el.nativeElement, script);
    }
  }

  extractScriptContent(message: string): string | null {
    const scriptTagPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    const match = scriptTagPattern.exec(message);
    return match ? match[1] : null;
  }
}
