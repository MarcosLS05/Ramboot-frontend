import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatDialog } from '@angular/material/dialog';
import { TipousuarioselectorComponent } from '../../tipousuario/tipousuarioselector/tipousuarioselector.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.admin.plist.routed.component.html',
  styleUrls: ['./usuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class UsuarioAdminPlistRoutedComponent implements OnInit {
  
  oPage: IPage<IUsuario> | null = null;
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
    private oUsuarioService: UsuarioService,
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
    this.oUsuarioService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IUsuario>) => {
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

  showTipousuarioSelectorModal(id: number | undefined) {
    if (id) {
      const dialogRef = this.dialog.open(TipousuarioselectorComponent, {
        height: '500px',
        maxHeight: '500px',
        width: '50%',
        maxWidth: '90%',

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          console.log(result);

          /*   ----> ejercicio
          // sustituir el tipo de apunte en el id de apunte seleccionado en oPage.content        
          this.oPage?.content.forEach((apunte) => {
            if (apunte.id === id) {
              apunte.tipoapunte = result;
            }
          });
          */

          // llamada al servidor
          this.oUsuarioService.setTipousuario(id, result.id).subscribe({
            next: (response: IUsuario) => {
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

  edit(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/edit', oUsuario.id]);
  }

  view(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/view', oUsuario.id]);
  }

  remove(oUsuario: IUsuario) {
    this.oRouter.navigate(['admin/usuario/delete/', oUsuario.id]);
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
//  <a href="admin/tipousuario/view/{{ usuario.tipousuario.id }}">
//    {{ usuario.tipousuario.titulo }} ({{ usuario.tipousuario.id }})
//  </a>
//  <a href="admin/usuario/plist/xtipousuario/{{ usuario.tipousuario.id }}">
//    <i class="bi bi-filter-circle"></i>
 // </a>
//</td>

//<td class="text-center">
//<a href="/admin/planesentrenamiento/plist/xusuario/{{ usuario.id }}" class="btn btn-primary">{{ usuario.planesentrenamiento }}</a>

//</td>
}
