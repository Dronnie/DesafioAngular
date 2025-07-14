import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet> <!-- Onde as rotas serão renderizadas -->
  `,
})
export class AppComponent {
  title = 'seu-projeto'; // Você pode customizar esse título conforme desejar
}
