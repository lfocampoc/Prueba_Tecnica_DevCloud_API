import { Component, inject } from '@angular/core';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Prueba tecnica Luisa';

  public isDarkPink: boolean = true

  themeService: ThemeService = inject(ThemeService);
}
