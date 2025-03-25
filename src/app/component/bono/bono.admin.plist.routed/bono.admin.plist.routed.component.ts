import { Component, inject, OnInit } from '@angular/core';
import { BonoService } from '../../../service/bono.service';
import { IBono } from '../../../model/bono.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackselectorComponent } from '../../snack/snackselector/snackselector.component';
import { BebidaselectorComponent } from '../../bebida/bebidaselector/bebidaselector.component';
import { ZonaselectorComponent } from '../../zona/zonaselector/zonaselector.component';

@Component({
  selector: 'app-bono.admin.routed',
  templateUrl: './bono.admin.plist.routed.component.html',
  styleUrls: ['./bono.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class BonoAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IBono> | null = null;
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
    private oBonoService: BonoService,
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
    this.oBonoService
      .getPage(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro
      )
      .subscribe({
        next: (oPageFromServer: IPage<IBono>) => {
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

  showSnackSelectorModal(id: number | undefined) {
    if (id) {
      const dialogRef = this.dialog.open(SnackselectorComponent, {
        height: '500px',
        maxHeight: '500px',
        width: '50%',
        maxWidth: '90%',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          console.log(result);
          // llamada al servidor
          this.oBonoService.setSnack(id, result.id).subscribe({
            next: (response: IBono) => {
              console.log(response);
              this.getPage();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            },
          });
        }
      });
      return false;
    } else {
      return false;
    }
  }

  showBebidaSelectorModal(id: number | undefined) {
    if (id) {
      const dialogRef = this.dialog.open(BebidaselectorComponent, {
        height: '500px',
        maxHeight: '500px',
        width: '50%',
        maxWidth: '90%',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          console.log(result);
          // llamada al servidor
          this.oBonoService.setBebida(id, result.id).subscribe({
            next: (response: IBono) => {
              console.log(response);
              this.getPage();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            },
          });
        }
      });
      return false;
    } else {
      return false;
    }
  }

  showZonaSelectorModal(id: number | undefined) {
    if (id) {
      const dialogRef = this.dialog.open(ZonaselectorComponent, {
        height: '500px',
        maxHeight: '500px',
        width: '50%',
        maxWidth: '90%',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          console.log(result);
          // llamada al servidor
          this.oBonoService.setBebida(id, result.id).subscribe({
            next: (response: IBono) => {
              console.log(response);
              this.getPage();
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            },
          });
        }
      });
      return false;
    } else {
      return false;
    }
  }

  edit(oBono: IBono) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/bono/edit', oBono.id]);
  }

  view(oBono: IBono) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/bono/view', oBono.id]);
  }

  remove(oBono: IBono) {
    this.oRouter.navigate(['admin/bono/delete/', oBono.id]);
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
  //  <a href="admin/tipoBono/view/{{ bono.tipoBono.id }}">
  //    {{ bono.tipoBono.titulo }} ({{ bono.tipoBono.id }})
  //  </a>
  //  <a href="admin/bono/plist/xtipoBono/{{ bono.tipoBono.id }}">
  //    <i class="bi bi-filter-circle"></i>
  // </a>
  //</td>

  //<td class="text-center">
  //<a href="/admin/planesentrenamiento/plist/xBono/{{ bono.id }}" class="btn btn-primary">{{ bono.planesentrenamiento }}</a>

  //</td>
}
