import { Component, inject, OnInit } from '@angular/core';
import { GcontrataService } from '../../../service/gcontrata.service';
import { IGcontrata } from '../../../model/gcontrata.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { IGcontrataproducto } from '../../../model/gcontrataproducto.interface';
import { ProductoselectorComponent } from '../../producto/productoselector/productoselector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PdfService } from '../../../service/pdf.service';

declare let bootstrap: any;

@Component({
  selector: 'app-gcontrata.admin.routed',
  templateUrl: './gcontrata.admin.plist.routed.component.html',
  styleUrls: ['./gcontrata.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatIconModule,],
})
export class GcontrataAdminPlistRoutedComponent implements OnInit {
  oGcontrataForm: FormGroup | undefined = undefined;
  oPage: IPage<IGcontrata> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
strField: string = 'id';     // Campo por el que se ordena
strDir: string = 'desc';     // Dirección de orden: descendente

  //
  usuarios: IUsuario[] = [];
  strFiltro: string = '';
  strFiltro2: string = '';
  //
  arrBotonera: string[] = [];
  //
  strMessage: string = '';

  myModal: any;

  cantidadProducto: number = 1;
  importeProducto: number = 0;

  selectedProducto: { id: number; nombre: string } | null = null;
  selectedUsuario: IUsuario | null = null;
  selectedZonaId: number | null = null;
  nuevoGcontrata: IGcontrata = {
    id: 0,
    importe: 0,
    fecha_creacion: new Date(),
    metodoPago:'',
    ticket:'',
    usuario: {} as IUsuario,
    gcontrataproducto: [],
  }

  
  private debounceSubject = new Subject<string>();
  readonly dialog = inject(MatDialog);
  constructor(
    private oGcontrataService: GcontrataService,
    private oBotoneraService: BotoneraService,
    private UsuarioService: UsuarioService,
    private oRouter: Router,
    private oPdfService: PdfService
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
    .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
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




verFactura(idContrato: number) {
  this.oGcontrataService.getFacturaById(idContrato).subscribe({
    next: (contratoConProductos) => {
      this.oPdfService.generarFactura(contratoConProductos);
    },
    error: (err) => {
      alert('No se pudo obtener la factura');
      console.error(err);
    }
  });
}




  edit(oGcontrata: IGcontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/gcontrata/edit', oGcontrata.id]);
  }

addImporte(
  oGcontrata: IGcontrata,
  usuarioId: number,
  productosComprados: IGcontrataproducto[] | null,
  montoParaSaldo: number
): void {
  // Validaciones
  if (!oGcontrata.metodoPago) {
    alert('Por favor, selecciona un método de pago.');
    return;
  }

  if (montoParaSaldo <= 0) {
    alert('El monto para saldo de la cuenta debe ser mayor que 0.');
    return;
  }

  // Llamada al servicio
  this.oGcontrataService
    .addImporte(oGcontrata, usuarioId, productosComprados, montoParaSaldo)
    .subscribe({
next: (nuevoContrato: IGcontrata) => {
  alert('El importe se ha añadido correctamente.');

  // Verificar si el contrato contiene productos
  if (nuevoContrato.gcontrataproducto && nuevoContrato.gcontrataproducto.length > 0) {
  } else {
    alert('No se encontraron productos en el contrato.');
  }

  // Actualiza la página si es necesario
  this.getPage();
},
      error: (err: HttpErrorResponse) => {
        console.error('Error al añadir el importe:', err);

        if (err.status === 400) {
          alert('Solicitud inválida. Por favor, verifica los datos ingresados.');
        } else if (err.status === 404) {
          alert('Usuario o contrato no encontrado.');
        } else if (err.status === 500) {
          alert('Error interno del servidor. Por favor, intenta nuevamente más tarde.');
        } else {
          alert('Ocurrió un error al añadir el importe.');
        }
      },
    });
}


  addProducto(oGcontrata: IGcontrata, producto: IGcontrataproducto[]) {
    // Validaciones
    if (!oGcontrata.metodoPago) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    if (producto.length === 0) {
      alert('Por favor, selecciona al menos un producto.');
      return;
    }

    this.oGcontrataService.addProducto(oGcontrata, producto).subscribe({
      next: (nuevoContrato) => {
        alert('El producto se ha añadido correctamente.');
        this.getPage(); 
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al añadir el importe:', err);
  
        
        if (err.status === 400) {
          alert('Solicitud inválida. Por favor, verifica los datos ingresados.');
        } else if (err.status === 404) {
          alert('Usuario o contrato no encontrado.');
        } else if (err.status === 500) {
          alert('Error interno del servidor. Por favor, intenta nuevamente más tarde.');
        } else {
          alert('Ocurrió un error al añadir el importe.');
        }
      },
    });
  }

  
  

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }


productosSeleccionados: IGcontrataproducto[] = [];

toggleProductoSeleccionado(producto: IGcontrataproducto, event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    this.productosSeleccionados.push(producto);
  } else {
    this.productosSeleccionados = this.productosSeleccionados.filter(
      (p) => p.id !== producto.id
    );
  }
}

eliminarProducto(index: number): void {
  this.nuevoGcontrata.gcontrataproducto.splice(index, 1);
}

  searchUsuarios() {
    if (this.strFiltro2.trim() !== '') {
      this.UsuarioService.searchByUsername(this.strFiltro2).subscribe({
        next: (data) => {
          this.usuarios = data;
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

  selectUsuario(usuario: IUsuario): void {
    this.selectedUsuario = usuario; 
    this.strFiltro2 = usuario.username; 
    this.usuarios = []; 
  }

  

  showProductoSelectorModal() {
    const dialogRef = this.dialog.open(ProductoselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        
  
        const nuevoProducto: IGcontrataproducto = {
          id: result.id,
          cantidad: 1, 
          importe: result.precio, // Asignar el precio como importe
          gcontrata: this.nuevoGcontrata,
          producto: {
            id: result.id,
            nombre: result.nombre,
            precio: result.precio,
            stock: result.stock,
          },
        };
  
        // Agregar el producto al array
        this.nuevoGcontrata.gcontrataproducto.push(nuevoProducto);
      }
    });
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
      this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.strField = field;
      this.strDir = 'desc';
    }
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

  filter2(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro2);
  }
}
