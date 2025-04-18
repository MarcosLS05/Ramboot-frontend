import { Component, inject, OnInit } from '@angular/core';
import { ZonaService } from '../../../service/zona.service';
import { IZona } from '../../../model/zona.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-zona.admin.routed',
  templateUrl: './zona.admin.plist.routed.component.html',
  styleUrls: ['./zona.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class ZonaAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IZona> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  readonly dialog = inject(MatDialog);
  constructor(
    private oZonaService: ZonaService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oZonaService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<IZona>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  edit(oZona: IZona) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/zona/edit', oZona.id]);
  }

  view(oZona: IZona) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/zona/view', oZona.id]);
  }

  remove(oZona: IZona) {
    this.oRouter.navigate(['admin/zona/delete/', oZona.id]);
  }

  goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.nPage++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.nPage--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.strField = field;
    this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }

  //  <td class="text-start">
  //  <a href="admin/tipoZona/view/{{ zona.tipoZona.id }}">
  //    {{ zona.tipoZona.titulo }} ({{ zona.tipoZona.id }})
  //  </a>
  //  <a href="admin/zona/plist/xtipoZona/{{ zona.tipoZona.id }}">
  //    <i class="bi bi-filter-circle"></i>
  // </a>
  //</td>

  //<td class="text-center">
  //<a href="/admin/planesentrenamiento/plist/xZona/{{ zona.id }}" class="btn btn-primary">{{ zona.planesentrenamiento }}</a>

  //</td>
}
