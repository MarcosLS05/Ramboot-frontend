import { Component, inject, OnInit } from '@angular/core';
import { GcontrataService } from '../../../service/gcontrata.service';
import { IGcontrata } from '../../../model/gcontrata.interface';
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
  selector: 'app-gcontrata.admin.routed',
  templateUrl: './gcontrata.admin.plist.routed.component.html',
  styleUrls: ['./gcontrata.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class GcontrataAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IGcontrata> | null = null;
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
    private oGcontrataService: GcontrataService,
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
    this.oGcontrataService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<IGcontrata>) => {
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

  edit(oGcontrata: IGcontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/gcontrata/edit', oGcontrata.id]);
  }

  view(oGcontrata: IGcontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/gcontrata/view', oGcontrata.id]);
  }

  remove(oGcontrata: IGcontrata) {
    this.oRouter.navigate(['admin/gcontrata/delete/', oGcontrata.id]);
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
  //  <a href="admin/tipoGcontrata/view/{{ gcontrata.tipoGcontrata.id }}">
  //    {{ gcontrata.tipoGcontrata.titulo }} ({{ gcontrata.tipoGcontrata.id }})
  //  </a>
  //  <a href="admin/gcontrata/plist/xtipoGcontrata/{{ gcontrata.tipoGcontrata.id }}">
  //    <i class="bi bi-filter-circle"></i>
  // </a>
  //</td>

  //<td class="text-center">
  //<a href="/admin/planesentrenamiento/plist/xGcontrata/{{ gcontrata.id }}" class="btn btn-primary">{{ gcontrata.planesentrenamiento }}</a>

  //</td>
}
