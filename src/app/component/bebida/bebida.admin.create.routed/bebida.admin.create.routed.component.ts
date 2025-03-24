import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IBebida } from '../../../model/bebida.interface';
import { BebidaService } from '../../../service/bebida.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-bebida-admin-create-routed',
  templateUrl: './bebida.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./bebida.admin.create.routed.component.css'],
})
export class BebidaAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oBebidaForm: FormGroup | undefined = undefined;
  oBebida: IBebida | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oBebidaService: BebidaService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oBebidaForm?.markAllAsTouched();
  }

  createForm() {
    this.oBebidaForm = new FormGroup({
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

  updateForm() {
    this.oBebidaForm?.controls['nombre'].setValue('');
    this.oBebidaForm?.controls['precio'].setValue('');
    this.oBebidaForm?.controls['stock'].setValue('');
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/bebida/view/' + this.oBebida?.id]);
  };

  onSubmit() {
    if (this.oBebidaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oBebidaService.create(this.oBebidaForm?.value).subscribe({
        next: (oBebida: IBebida) => {
          this.oBebida = oBebida;
          this.updateForm();
          this.showModal('Producto ' + this.oBebida.id + ' creado');
        },
        error: (err) => {
          this.showModal('Error al crear el producto');
          console.log(err);
        },
      });
    }
  }
}
