import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProducto } from '../../../model/producto.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-producto-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './producto.admin.delete.component.html',
  styleUrl: './producto.admin.delete.component.css',
})
export class ProductoAdminDeleteRoutedComponent implements OnInit {
  oProducto: IProducto | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oProductoService: ProductoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oProductoService.get(id).subscribe({
      next: (oProducto: IProducto) => {
        this.oProducto = oProducto;
      },
      error: (err) => {
        this.showModal('Error al cargar el producto');
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

  delete(): void {
    this.oProductoService.delete(this.oProducto!.id).subscribe({
      next: (data) => {
        this.showModal(
          'producto con id ' + this.oProducto!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el producto');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/producto/plist']);
  };
}
