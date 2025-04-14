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
import { IUsuario } from '../../../model/usuario.interface';
import { IZona } from '../../../model/zona.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { ZonaService } from '../../../service/zona.service';
import { IGcontrataproducto } from '../../../model/gcontrataproducto.interface';

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
  strDir: string = 'asc';
  //
  usuarios: IUsuario[] = [];
  strFiltro: string = '';
  strFiltro2: string = '';
  //
  arrBotonera: string[] = [];
  //

  selectedUsuario: IUsuario | null = null;
  selectedZonaId: number | null = null;
  nuevoGcontrata: IGcontrata = {
    id: 0,
    importe: 0,
    fecha_creacion: new Date(),
    metodoPago:'',
    ticket:'',
    usuario: {} as IUsuario,
    gcontrataproducto: {} as IGcontrataproducto,
  }

  zonas: IZona[] = [];
  
  private debounceSubject = new Subject<string>();
  readonly dialog = inject(MatDialog);
  constructor(
    private oGcontrataService: GcontrataService,
    private oZonaService: ZonaService,
    private oBotoneraService: BotoneraService,
    private UsuarioService: UsuarioService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
    this.loadZonas();
  }

  getPage() {
    this.oGcontrataService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IGcontrata>) => {
          // Ordenar los datos por fecha_creacion en orden descendente
          oPageFromServer.content.sort((a, b) => {
            const dateA = new Date(a.fecha_creacion).getTime();
            const dateB = new Date(b.fecha_creacion).getTime();
            return dateB - dateA; // Orden descendente
          });
  
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

  private loadZonas(): void {
    this.oZonaService.getAll().subscribe({
      next: (response) => {
//        console.log('Zonas cargadas:', response); // Verifica la estructura de los datos
        this.zonas = response.content; // Extrae el array de zonas desde la propiedad content
      },
      error: (err) => {
        console.error('Error al cargar las zonas:', err);
      },
    });
  }

  edit(oGcontrata: IGcontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/gcontrata/edit', oGcontrata.id]);
  }

  addImporte(oGcontrata: IGcontrata, usuarioId: number) {
    if (!oGcontrata.metodoPago) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }
  
    this.oGcontrataService.addImporte(oGcontrata, usuarioId).subscribe({
      next: (nuevoContrato) => {
        console.log('Contrato actualizado con nuevo importe:', nuevoContrato);
        alert('El importe se ha añadido correctamente.');
        this.getPage(); // Actualiza la lista después de la operación
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al añadir el importe:', err);
        alert('Ocurrió un error al añadir el importe.');
      },
    });
  }

  searchUsuarios() {
    console.log('Buscando usuarios con filtro:', this.strFiltro2);
    if (this.strFiltro2.trim() !== '') {
      this.UsuarioService.searchByUsername(this.strFiltro2).subscribe({
        next: (data) => {
          console.log('Usuarios encontrados:', data); // Verifica los datos recibidos
          this.usuarios = data; // Asegúrate de que los datos se asignen correctamente
        },
        error: (err) => {
          console.error('Error al buscar usuarios:', err);
        },
      });
    } else {
      console.log('Filtro vacío, limpiando resultados');
      this.usuarios = [];
    }
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

  sort(field: string): void {
    if (this.strField === field) {
      // Alternar entre ascendente y descendente si el campo es el mismo
      this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    } else {
      // Cambiar el campo de ordenación y establecer dirección descendente
      this.strField = field;
      this.strDir = 'desc';
    }
    this.getPage(); // Recargar la página con el nuevo orden
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

  filter2(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro2);
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
