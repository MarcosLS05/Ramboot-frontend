import { Component, inject, OnInit } from '@angular/core';
import { BebidaService } from '../../../service/bebida.service';
import { IBebida } from '../../../model/bebida.interface';
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
  selector: 'app-bebida.admin.routed',
  templateUrl: './bebida.admin.plist.routed.component.html',
  styleUrls: ['./bebida.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class BebidaAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IBebida> | null = null;
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
    private oBebidaService: BebidaService,
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
    this.oBebidaService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<IBebida>) => {
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

  edit(oBebida: IBebida) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/bebida/edit', oBebida.id]);
  }

  view(oBebida: IBebida) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/bebida/view', oBebida.id]);
  }

  remove(oBebida: IBebida) {
    this.oRouter.navigate(['admin/bebida/delete/', oBebida.id]);
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
  //  <a href="admin/tipoBebida/view/{{ bebida.tipoBebida.id }}">
  //    {{ bebida.tipoBebida.titulo }} ({{ bebida.tipoBebida.id }})
  //  </a>
  //  <a href="admin/bebida/plist/xtipoBebida/{{ bebida.tipoBebida.id }}">
  //    <i class="bi bi-filter-circle"></i>
  // </a>
  //</td>

  //<td class="text-center">
  //<a href="/admin/planesentrenamiento/plist/xBebida/{{ bebida.id }}" class="btn btn-primary">{{ bebida.planesentrenamiento }}</a>

  //</td>
}
