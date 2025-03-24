import { Component, inject, OnInit } from '@angular/core';
import { SnackService } from '../../../service/snack.service';
import { ISnack } from '../../../model/snack.interface';
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
  selector: 'app-snack.admin.routed',
  templateUrl: './snack.admin.plist.routed.component.html',
  styleUrls: ['./snack.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class SnackAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<ISnack> | null = null;
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
    private oSnackService: SnackService,
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
    this.oSnackService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<ISnack>) => {
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

  edit(oSnack: ISnack) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/snack/edit', oSnack.id]);
  }

  view(oSnack: ISnack) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/snack/view', oSnack.id]);
  }

  remove(oSnack: ISnack) {
    this.oRouter.navigate(['admin/snack/delete/', oSnack.id]);
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
  //  <a href="admin/tipoSnack/view/{{ snack.tipoSnack.id }}">
  //    {{ snack.tipoSnack.titulo }} ({{ snack.tipoSnack.id }})
  //  </a>
  //  <a href="admin/snack/plist/xtipoSnack/{{ snack.tipoSnack.id }}">
  //    <i class="bi bi-filter-circle"></i>
  // </a>
  //</td>

  //<td class="text-center">
  //<a href="/admin/planesentrenamiento/plist/xSnack/{{ snack.id }}" class="btn btn-primary">{{ snack.planesentrenamiento }}</a>

  //</td>
}
