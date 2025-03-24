import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBebida } from '../../../model/bebida.interface';
import { BebidaService } from '../../../service/bebida.service';
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
  selector: 'app-bebida-admin-edit-routed',
  templateUrl: './bebida.admin.edit.routed.component.html',
  styleUrls: ['./bebida.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class BebidaAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oBebidaForm: FormGroup | undefined = undefined;
  oBebida: IBebida | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oBebidaService: BebidaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oBebidaForm?.markAllAsTouched();
  }

  createForm() {
    this.oBebidaForm = new FormGroup({
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
    this.oBebidaService.get(this.id).subscribe({
      next: (oBebida: IBebida) => {
        this.oBebida = oBebida;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oBebidaForm?.controls['id'].setValue(this.oBebida?.id);
    this.oBebidaForm?.controls['nombre'].setValue(this.oBebida?.nombre);
    this.oBebidaForm?.controls['precio'].setValue(this.oBebida?.precio);
    this.oBebidaForm?.controls['stock'].setValue(this.oBebida?.stock);
  }

  get() {
    this.oBebidaService.get(this.id).subscribe({
      next: (oBebida: IBebida) => {
        this.oBebida = oBebida;
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
    this.oRouter.navigate(['/admin/bebida/view/' + this.oBebida?.id]);
  };

  onSubmit() {
    if (!this.oBebidaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oBebidaService.update(this.oBebidaForm?.value).subscribe({
        next: (oBebida: IBebida) => {
          this.oBebida = oBebida;
          this.updateForm();
          this.showModal('Producto ' + this.oBebida.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el producto');
          console.error(error);
        },
      });
    }
  }
}
