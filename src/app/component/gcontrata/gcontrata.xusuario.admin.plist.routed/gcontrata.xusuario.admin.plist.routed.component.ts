import { Component, OnInit } from '@angular/core';import { IGcontrata } from '../../../model/gcontrata.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { GcontrataService } from '../../../service/gcontrata.service';

@Component({
  selector: 'app-gcontrata-xusuario-admin-routed',
  templateUrl: './gcontrata.xusuario.admin.plist.routed.component.html',
  styleUrls: ['./gcontrata.xusuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class GcontrataXUsuarioAdminPlistRoutedComponent implements OnInit {
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
  //
  oUsuario: IUsuario = {} as IUsuario;

  constructor(
    private oGcontrataService: GcontrataService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
    // get id from route admin/Grupocontrata/plist/xusuario/:id
    this.oActivatedRoute.params.subscribe((params) => {
      this.oUsuarioService.get(params['id']).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.getPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  ngOnInit() {
  }

  getPage() {
    
    this.oGcontrataService
      .getPageXUsuario(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro,
        this.oUsuario.id
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
}