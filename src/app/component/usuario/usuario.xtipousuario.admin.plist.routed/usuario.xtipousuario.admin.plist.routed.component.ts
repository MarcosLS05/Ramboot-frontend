import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ITipousuario } from '../../../model/tipousuario.interface';
import { tipousuarioService } from '../../../service/tipousuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario.admin.routed',
  templateUrl: './usuario.xtipousuario.admin.plist.routed.component.html',
  styleUrls: ['./usuario.xtipousuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class UsuarioXTipousuarioAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IUsuario> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = 'desc';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();

  oTipousuario: ITipousuario = {} as ITipousuario;

  constructor(
    private oUsuarioService: UsuarioService,
    private oTipousuarioService: tipousuarioService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.debounceSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.nPage = 0;
      this.getPage();
    });
    // get id from route admin/usuario/plist/xtipousuario/:id
    this.oActivatedRoute.params.subscribe((params) => {
      this.oTipousuarioService.get(params['id']).subscribe({
        next: (oTipousuario: ITipousuario) => {
          this.oTipousuario = oTipousuario;
          this.getPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oUsuarioService
      .getPageXTipoUsuario(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro,
        this.oTipousuario.id
      )
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

  edit(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/edit/', oUsuario.id]);
  }

  view(oUsuario: IUsuario) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/usuario/view/', oUsuario.id]);
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
}
