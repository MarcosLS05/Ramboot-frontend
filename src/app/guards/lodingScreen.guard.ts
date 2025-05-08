import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoadingService } from '../service/loadingScreen.service'; // ajusta ruta
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingGuard implements CanActivate {

  constructor(private loadingService: LoadingService) {}

  canActivate(): Observable<boolean> {
    this.loadingService.mostrar();
    return of(true); // permite navegar
  }
}
