import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SharedMenuUnroutedComponent } from './component/shared/shared.menu.unrouted/shared.menu.unrouted.component';
import { LoadingService } from './service/loadingScreen.service'; // Asegúrate de tener este servicio creado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedMenuUnroutedComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Ramboot-frontend';

  constructor(private router: Router, public loading: LoadingService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading.mostrar();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.ocultar();
      }
    });
  }
}

