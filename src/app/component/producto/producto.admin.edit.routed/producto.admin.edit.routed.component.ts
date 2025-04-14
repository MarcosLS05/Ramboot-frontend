import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IProducto } from '../../../model/producto.interface';
import { ProductoService } from '../../../service/producto.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  selector: 'app-producto-admin-edit-routed',
  templateUrl: './producto.admin.edit.routed.component.html',
  styleUrls: ['./producto.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class ProductoAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oProductoForm: FormGroup | undefined = undefined;
  oProducto: IProducto | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProductoService: ProductoService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oProductoForm?.markAllAsTouched();
  }

  createForm() {
    this.oProductoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onReset() {
    this.oProductoService.get(this.id).subscribe({
      next: (oProducto: IProducto) => {
        this.oProducto = oProducto;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oProductoForm?.controls['id'].setValue(this.oProducto?.id);
    this.oProductoForm?.controls['nombre'].setValue(this.oProducto?.nombre);
    this.oProductoForm?.controls['precio'].setValue(this.oProducto?.precio);
    this.oProductoForm?.controls['stock'].setValue(this.oProducto?.stock);
  }

  get() {
    this.oProductoService.get(this.id).subscribe({
      next: (oProducto: IProducto) => {
        this.oProducto = oProducto;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/producto/view/' + this.oProducto?.id]);
  };

  onSubmit() {
    if (!this.oProductoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oProductoService.update(this.oProductoForm?.value).subscribe({
        next: (oProducto: IProducto) => {
          this.oProducto = oProducto;
          this.updateForm();
          this.showModal('Producto ' + this.oProducto.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el producto');
          console.error(error);
        },
      });
    }
  }
}
